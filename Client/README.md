# VITE + REACT
  - "@auth0/auth0-react": "^2.3.0",
  - "axios": "^1.8.1",
  - "mobx-react-lite": "^4.1.0",
  - "prop-types": "^15.8.1",
  - "react": "^18.3.1",
  - "react-dom": "^18.3.1",
  - "react-router-dom": "^6.30.0"

## ENVIRONMENT VARIABLES (.ENV) REQUIREMENTS

[Vite: Using environment variables and modes](https://vite.dev/guide/env-and-mode)

The .env for the client is distributed throughout the application to conceal the values of application identity.

  - VITE_AUTH0_DOMAIN=your-domain.us.auth0.com
  - VITE_AUTH0_CLIENT_ID=thi5sh0uld6eal0ng9strin60fl3tter54ndnum63r5
  - VITE_AUTH0_AUDIENCE=https://your-audience-here
  - VITE_SERVER_URL=http://localhost:80

## USAGE INSTRUCTIONS
- Create .env file in root directory (\Client)
- Setup correct .env values
```
cd client
```
```
npm i
```

The flow of the frontend is:

1) Create and use React components to set up basic features
2) Send api requests to a new service (ex. NounService.js) from pages and components
3) Use the Application State (AppState.js) to store incoming data from the server and send new or altered data to the server. 
## RUNTIME
```
npm run dev
```
Compiling for production environments
```
npm run build
```
## NOTES
### User Sync
AuthService.js contains ```registerOrSyncUser()```:
```
// AuthService.js

export async function registerOrSyncUser(user) { 
  const { sub, email, name, picture } = user;
  try {
      const response = await api.post('/users', {
        // THESE VALUES WILL SYNC WITH AUTH0 EVERY REFRESH OR LOGIN
        // DO NOT USE ANYTHING ELSE HERE UNLESS YOU WANT IT TO SYNC
        auth0Id: sub,
        email,
        username: name,
        profilePicture: picture
      });

      AppState.user = response.data;
  } catch (error) {
      console.error('[User Sync Failed]', error);
  }
}
```
Remove username if letting the user change it is desired, as we do not want it to sync with data passed back to us from Auth0. We want this application to store that information (in the database). 
```registerOrSyncUser()``` is called in App.jsx:
```
// App.jsx

 const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      registerOrSyncUser(user);
    }
  }, [isAuthenticated, user]);
```
Update AuthService.js to reflect the user properties the application may need to sync (when user logs in / signs up). 
This ensures that accounts can be handled through Auth0 and sync with the application but service from the application (business logic added to this app) is managed by this application's client, server, and database. Any added data columns to the user table will correlate to the synched data from Auth0 and the id generated for an account in the server (IdGen.js) before being stored in the database. Users not added to the database for any reason upon initial sign-up will synchronize when the user logs in again. 

Unverified users (users who have not clicked on the verification email link), are not added to the database. Auth0 provides account flags used on the front end to only send verified user information to the database:

```
// App.jsx

useEffect(() => {
  if (isAuthenticated && user?.email_verified) { // This prevents unverified users from being saved to the DB.
    registerOrSyncUser(user);
  }
}, [isAuthenticated, user]);

```