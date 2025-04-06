# DCA Simulator

Martin Anselmo

Live @ https://dca-simulator-ten.vercel.app/

## Technologies
- React 19
- Vite
- Vitest
- Tanstack Query
- Shadcn/ui
- Eslint + prettier
- TailwindCss

## Dev
- Local dev environment `npm install --legacy-peer-deps && npm run dev` (there are issues with some dependencies and React 19 which is why we require the --legacy-peer-deps option)
  - Note: Local dev environment is set up to use: https://github.com/garmeeh/local-cors-proxy for solving CORS issue
- Lint: `npm run lint`
- Run tests: `npm run test`

Use some CORS tool so the app is able to correctly connect with Buda's API

## Production
- Hosted in vercel: https://dca-simulator-ten.vercel.app/
- Possible to host with any docker compatible service
  - `docker build -t my-vite-react-app .`
  - `docker run -p 3000:80 my-vite-react-app`
  


