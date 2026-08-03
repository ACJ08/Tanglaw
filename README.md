
  # Tanglaw

  This is a code bundle for Tanglaw. The original project is available at https://www.figma.com/design/FYrT4uBZ6qOQ0kfD0lMqC8/Tanglaw.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  Run `npm run build` and `npm run preview` to test the production bundle locally.

  ## Deployment

  The app is ready for Vercel. `vercel.json` serves the Vite build and falls
  back to `index.html` after checking filesystem routes, so direct visits to
  client-side routes work while `/api/verify` remains a serverless function.

  Configure these variables in Vercel:

  - `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`: public browser values;
    set for Development, Preview, and Production.
  - `VITE_DEMO_AUTH_ENABLED`: public feature flag; use `false` in production
    unless public demo accounts are intentional.
  - `GROQ_API_KEY`: server-only secret for Preview and Production. Never add a
    `VITE_` prefix.
  - `GROQ_MODEL`: optional server-only model override.

  Copy `.env.example` to `.env.local` for local development. Use
  `.env.production.example` as the production configuration reference; do not
  commit real keys. `PORT` and `FRONTEND_ORIGIN` are only used by the optional
  local Express server (`npm run server`), not by Vercel.
