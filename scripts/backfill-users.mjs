/**
 * One-time backfill: Firebase Auth users -> Firestore users/{uid} documents.
 *
 * WHY THIS IS SAFE
 * - Reads real Auth accounts via admin.auth().listUsers() (no fake users).
 * - Writes a users/{uid} doc ONLY when it does NOT already exist; existing
 *   docs and their fields (username, email, createdAt, lastLoginAt,
 *   lastUserAgent) are preserved untouched.
 * - Uses the real Auth UID and email. createdAt comes from the real Auth
 *   creationTime. Passwords/Auth accounts are never read or modified.
 *
 * This script lives OUTSIDE the client app and must never ship to the client.
 * The service-account key is loaded from a local file that is git-ignored.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Point this at your downloaded service-account JSON. It is git-ignored.
const SERVICE_ACCOUNT_PATH = join(__dirname, 'service-account.json');

// Default Firestore collection the client app reads.
const COLLECTION = 'users';

function loadCredentials() {
  try {
    return JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, 'utf8'));
  } catch (err) {
    console.error(
      `\n[backfill] Could not read the service-account key at:\n  ${SERVICE_ACCOUNT_PATH}\n` +
        `Download it from Firebase Console > Project settings > Service accounts,\n` +
        `save it as scripts/service-account.json (git-ignored), then re-run.\n`
    );
    throw err;
  }
}

function initAdmin(creds) {
  if (getApps().length === 0) {
    initializeApp({ credential: cert(creds) });
  }
}

// Stream every Auth user in batches (max 1000 per page per the SDK).
async function listAllAuthUsers(auth) {
  const users = [];
  let nextPageToken;
  do {
    const result = await auth.listUsers(1000, nextPageToken);
    users.push(...result.users);
    nextPageToken = result.pageToken;
  } while (nextPageToken);
  return users;
}

async function main() {
  const creds = loadCredentials();
  initAdmin(creds);

  const auth = getAuth();
  const db = getFirestore();

  console.log('[backfill] Reading Firebase Authentication users…');
  const authUsers = await listAllAuthUsers(auth);
  console.log(`[backfill] Found ${authUsers.length} Auth user(s).`);

  let created = 0;
  let skipped = 0;
  let errored = 0;

  for (const u of authUsers) {
    const uid = u.uid;
    const ref = db.collection(COLLECTION).doc(uid);

    try {
      const existing = await ref.get();
      if (existing.exists) {
        // Preserve whatever the client/app already wrote.
        skipped += 1;
        continue;
      }

      const email = u.email || '';
      const displayName = u.displayName || '';
      await ref.set({
        // Prefer the Auth display name; fall back to the email local-part,
        // matching the client's mapFirebaseUser fallback behaviour.
        username: displayName || (email ? email.split('@')[0] : 'User'),
        email,
        // Real Auth account creation time.
        createdAt: u.metadata?.creationTime || new Date().toISOString(),
      });
      created += 1;
      console.log(`[backfill] created users/${uid} (${email || 'no-email'})`);
    } catch (err) {
      errored += 1;
      console.error(`[backfill] FAILED users/${uid}: ${err?.message || err}`);
    }
  }

  console.log(
    `\n[backfill] Done. created=${created} skipped=${skipped} (already existed) errored=${errored}`
  );
  if (errored > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error('[backfill] Fatal error:', err?.message || err);
  process.exit(1);
});
