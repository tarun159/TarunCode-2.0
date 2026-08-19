# Firebase Auth → Firestore `users` Backfill (one-time)

A **standalone, server-side** script that copies your real Firebase Authentication
users into the `users/{uid}` Firestore collection so the **Admin → User Activity**
page can list them.

It is intentionally **outside** the `client/` app and uses the **Admin SDK** with a
private service-account key. It never ships to the browser and never creates fake
users.

## What it does
1. Reads **every** real Auth user via `auth.listUsers()`.
2. For each UID, creates a `users/{uid}` doc **only if it does not already exist**.
   - Existing docs and their fields (`username`, `email`, `createdAt`,
     `lastLoginAt`, `lastUserAgent`) are left untouched.
3. Sets `createdAt` from the real Auth `creationTime`, and `email`/`username` from
   the real Auth record.
4. Does **not** modify passwords, Auth accounts, or any app code.

## How to run it locally

### 1. Get your service-account key (private — never commit)
- Firebase Console → **Project settings** → **Service accounts**.
- Click **Generate new private key**. This downloads a JSON file.
- Save it as exactly: `scripts/service-account.json`.
  (This filename is git-ignored; confirm with `git status` before committing.)

### 2. Install the Admin SDK (only in this folder)
```bash
cd scripts
npm install
```

### 3. Run the backfill
```bash
npm run backfill
# or directly:
node backfill-users.mjs
```

### 4. Read the output
It prints, per user: `created users/{uid} (email)` or skips already-existing ones.
At the end:
```
[backfill] Done. created=N skipped=M errored=K
```
- `created` — new docs written.
- `skipped` — already had a `users/{uid}` doc (preserved).
- `errored` — failed writes (rare; exit code is non-zero if any).

### 5. Clean up (recommended)
When done, you can delete `scripts/service-account.json` and `scripts/node_modules`.
You do **not** need to commit anything in `scripts/`. The client app is unchanged.

## After running
Log in to the app as the admin (`VITE_ADMIN_EMAIL`) and open
**Admin → User Activity**. The previously-missing users should now appear with their
real `Account Created` dates.

## Notes
- Requires Node.js >= 18 (matches the project `engines`).
- Your Firebase project's **Firestore security rules** must allow the Admin SDK to
  write — this is always true for the Admin SDK (it bypasses rules), so no rule
  change is needed for this script. (The client's own read access for the Admin
  page is governed separately by your Firestore rules.)
- This is a one-time operation. Going forward, new signups already write their own
  `users/{uid}` doc from the client.
