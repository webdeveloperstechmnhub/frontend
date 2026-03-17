# Frontend

This app is built with React and Vite.

## Run locally

Install dependencies and start the Vite dev server:

```powershell
npm.cmd install
npm.cmd run dev
```

Do not open `index.html` directly or serve the `src` folder with a basic static server. Vite must transform `.jsx` files during development, and production hosting must serve the built files from `dist`.

## Production build

```powershell
npm.cmd run build
npm.cmd run preview
```

The production build output is written to `dist`.

## Vercel deployment

Deploy the `frontend` folder as the project root.

- Build command: `npm run build`
- Output directory: `dist`
- Framework preset: `Vite`

The included `vercel.json` is configured for SPA routing and Vite build output.

## Mail form setup

The Join and Contact pages use a `mailto:` link to open the user's email client.
Replace `YOUR_EMAIL_HERE` in these files:

- `src/pages/Join.jsx`
- `src/pages/Contact.jsx`
"# fronend" 
