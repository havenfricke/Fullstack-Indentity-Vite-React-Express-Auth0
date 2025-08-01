# VITE + REACT
  - "@auth0/auth0-react": "^2.3.0",
  - "axios": "^1.8.1",
  - "mobx-react-lite": "^4.1.0",
  - "prop-types": "^15.8.1",
  - "react": "^18.3.1",
  - "react-dom": "^18.3.1",
  - "react-router-dom": "^6.30.0"

## .ENV REQUIREMENTS

The .env for the client is distributed throughout the application to conceal the values of application identity.

  - VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
  - VITE_AUTH0_CLIENT_ID=thi5sh0uld6eal0ng9strin60fl3tter54ndnum63r5
  - VITE_AUTH0_AUDIENCE=https://your-audience-here
  - VITE_SERVER_URL=http://localhost:80

# Usage Instructions
In highest directory run:
```
npm i
```
To run a dev server (server url in .env first)
```
npm run dev
```
For production environments
```
npm run build
```
