# TarunCode 2.0

A premium, futuristic platform for browsing and copying **PC Lab** and **IoT Lab**
programs. Read-only code viewer — users can only view and copy.

## Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Auth:** Firebase Authentication (email/password)
- **Database:** Firebase Firestore (stores a `username` per user)
- **Styling:** Tailwind CSS + Framer Motion (3D animations)
- **Hosting:** Vercel (static SPA)

There is **no backend server**. Express, MongoDB, and JWT were removed; all program
data lives in `client/src/data/programs.ts`.

## Local development

```bash
# 1. Configure Firebase env vars
cp client/.env.example client/.env.local   # then fill in your Firebase values

# 2. Install deps
npm install --prefix client

# 3. Run dev server
npm run dev
```

## Editing programs

Edit `client/src/data/programs.ts`. PC and IoT labs each have exactly 10 slots
(`number` 1–10). Leave the `code` field empty for now — a placeholder is shown in the
viewer until you paste the real program.

## Deploy to Vercel

1. Import this repo in Vercel. The `vercel.json` already sets:
   - Build command: `npm run build --prefix client`
   - Output directory: `client/dist`
   - SPA rewrite to `index.html`
2. Add the six `VITE_FIREBASE_*` environment variables (or link them to Vercel
   project environment variables / secrets named in `vercel.json`).
3. Set up Firebase:
   - Enable **Email/Password** sign-in in Firebase Console → Authentication.
   - Create a **Firestore** database; the app writes to `users/{uid}`.
   - Add your Vercel domain to **Authorized domains** and restrict Firestore with
     rules (e.g. users can only read/write their own `users/{uid}` doc).

## Env vars

See `client/.env.example`. All `VITE_*` vars are embedded in the client bundle, so
only use the public Firebase web API key.
