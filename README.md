### IDENTITY ASSERTION: REACT + EXPRESS + AUTH0

Fullstack scaffold / boilerplate. Features sign-up, log-in, user-sync, and the option to add more application controlled data columns to the user table. Auth0 handles the login services and the application uses the information returned from Auth0 to create and store the user in our database. The application handles syncing specific data such as email and "auth0Id".

### REACT + VITE (CLIENT)
  - @auth0/auth0-react
  - axios
  - mobx-react-lite
  - prop-types
  - react
  - react-dom
  - react-router-dom

### [CLIENT](https://github.com/havenfricke/Fullstack-Indentity-Vite-React-Express-Auth0/tree/main/Client)


### EXPRESS (SERVER)
  - dotenv,
  - express
  - express-jwt
  - jwks-rsa
  - multer
  - mysql2

### [SERVER](https://github.com/havenfricke/Fullstack-Indentity-Vite-React-Express-Auth0/tree/main/Server)

### AUTH0 SETUP

  - If you do not already have one, [create an Auth0 account](https://auth0.com/signup).

  - [Dashboard](https://manage.auth0.com/) > Applications > Applications > + Create Application

  - [Dashboard](https://manage.auth0.com/) > Applications > APIs > + Create API

### AUTH0 REQUIRED VALUES FOR .ENV (CLIENT AND SERVER)

- VITE_AUTH0_DOMAIN or AUTH0_DOMAIN: [Dashboard](https://manage.auth0.com/) > Applications > (Your Auth0 app name) > Settings Tab > "Domain"

- VITE_AUTH0_CLIENT_ID: [Dashboard](https://manage.auth0.com/) > Applications > (Your Auth0 app name) > Settings Tab > "Client ID"

- VITE_AUTH0_AUDIENCE or AUTH0_AUDIENCE: [Dashboard](https://manage.auth0.com/) > APIs > (Your Auth0 app name) > Settings Tab > "Identifier"

### AUTH0 REQUIRED SETTINGS

#### URIs / URLs

- [Dashboard](https://manage.auth0.com/) > Applications > Applications > Settings Tab > "Application URIs", "Allowed Callback URLs", "Allowed Logout URLs"

- For all three fields, add the client or frontend url. 

- In a dev environment, something like https://localhost:3000 (You'll need to change this for production environments).

#### EMAIL VERIFICATION POST SIGNUP

- [Actions](https://manage.auth0.com/dashboard/us/dev-g1go98bp/actions/triggers) > Triggers > "post-login"

- Create an action for post-login (name send "verification email" or "verify email action")

- Use this in the JavaScript portal Auth0 offers for creating actions to send verification upon first sign in:

```

// Post-Login Action to send a verification email after first login

exports.onExecutePostLogin = async (event, api) => {
  const isFirstLogin = event.stats.logins_count === 1;

  if (!event.user.email_verified && isFirstLogin) {
    // Bypass the TypeScript issue
    api.sendEmailVerification();
  }
}
```
- After implementing, go to [Actions](https://manage.auth0.com/dashboard/us/dev-g1go98bp/actions/triggers) > Triggers > "post-login"

- Add the newly created action to the post-login trigger
