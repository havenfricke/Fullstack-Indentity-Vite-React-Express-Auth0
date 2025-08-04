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

## Usage Instructions
- Create .env file in root directory (\Client)
- Setup correct .env values
```
cd client
```
```
npm i
```
To run a dev server (server url in .env first)
```
npm run dev
```
Compiling for production environments
```
npm run build
```

## Notes
### User Sync
AuthService.js contains ```registerOrSyncUser()```:
```
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
We would remove username if we want to let the user change it, as we do not want it to sync with data passed back to us from Auth0. We want this application to store that information (in the database). 
```registerOrSyncUser()``` is called in App.jsx:
```
 const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated && user) {
      registerOrSyncUser(user);
    }
  }, [isAuthenticated, user]);
```
Update AuthService.js to reflect the user properties the application may need to sync (when user logs in / signs up). 
This ensures that accounts can be handled through Auth0 and sync with our application but service from the application (business logic added to this app) is managed by our client, server, and database. Any added data columns to the user table will correlate to the synched data from Auth0.
Users not added to the database for any reason upon initial sign-up will synchronize when the user logs in again. 