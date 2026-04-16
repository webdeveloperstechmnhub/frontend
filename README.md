# Website Frontend

Public website frontend built with React + Vite.

## Tech Stack
- React 19
- Vite 7
- React Router
- Axios
- TailwindCSS (with Vite plugin)

## Prerequisites
- Node.js 18+
- npm 9+

## Install
```bash
npm install
```

## Environment Variables
Create `.env` in this folder:

```env
VITE_BACKEND_URL=<YOUR_BACKEND_API_BASE>
VITE_RAZORPAY_KEY_ID=<YOUR_RAZORPAY_KEY_ID>
```

Example:
```env
VITE_BACKEND_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=<YOUR_RAZORPAY_KEY_ID>
```

## Run
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Important Routes
- `/` Home
- `/register` Registration form
- `/employee-card` Employee verification card

## Notes
- Do not commit real `.env` secrets.
- Ensure backend CORS allows the frontend origin.
