# IDENTITY ASSERTION: REACT + EXPRESS + AUTH0

Fullstack scaffold / boilerplate. Features sign-up, log-in, user-sync, and the option to add more application controlled data columns to the user table. Auth0 handles the login services and the application uses the information returned from Auth0 to create and store the user in our database. The application handles syncing specific data such as email and "auth0Id".

## REACT + VITE
  - "@auth0/auth0-react": "^2.3.0",
  - "axios": "^1.8.1",
  - "mobx-react-lite": "^4.1.0",
  - "prop-types": "^15.8.1",
  - "react": "^18.3.1",
  - "react-dom": "^18.3.1",
  - "react-router-dom": "^6.30.0"

### [Client](https://github.com/havenfricke/Fullstack-Indentity-Vite-React-Express-Auth0/tree/main/Client)

## EXPRESS
  - "dotenv": "^16.4.7",
  - "express": "^4.21.2",
  - "express-jwt": "^8.5.1",
  - "jwks-rsa": "^3.2.0",
  - "multer": "^1.4.5-lts.1",
  - "mysql2": "^3.12.0"

### [Server](https://github.com/havenfricke/Fullstack-Indentity-Vite-React-Express-Auth0/tree/main/Server)

## AUTH0 SETUP
  - If you do not already have one, [create an Auth0 account](https://auth0.com/signup).
  - [Dashboard](https://manage.auth0.com/) > Applications > Applications > + Create Application
  - [Dashboard](https://manage.auth0.com/) > Applications > APIs > + Create API

## AUTH0 REQUIRED VALUES FOR .ENV (CLIENT AND SERVER)
- VITE_AUTH0_DOMAIN or AUTH0_DOMAIN: [Dashboard](https://manage.auth0.com/) > Applications > (Your Auth0 app name) > Settings Tab > "Domain"
- VITE_AUTH0_CLIENT_ID: [Dashboard](https://manage.auth0.com/) > Applications > (Your Auth0 app name) > Settings Tab > "Client ID"
- VITE_AUTH0_AUDIENCE or AUTH0_AUDIENCE: [Dashboard](https://manage.auth0.com/) > APIs > (Your Auth0 app name) > Settings Tab > "Identifier"

## AUTH0 REQUIRED SETTINGS
- [Dashboard](https://manage.auth0.com/) > Applications > Applications > Settings Tab > "Application URIs", "Allowed Callback URLs", "Allowed Logout URLs"
- For all three fields, add the client or frontend url. 
- In a dev environment, something like https://localhost:3000 (You'll need to change this for production environments).

