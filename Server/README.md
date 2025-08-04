# EXPRESS SERVER
  - "dotenv": "^16.4.7",
  - "express": "^4.21.2",
  - "express-jwt": "^8.5.1",
  - "jwks-rsa": "^3.2.0",
  - "multer": "^1.4.5-lts.1",
  - "mysql2": "^3.12.0"

## SETUP
- Create .env file in root directory (\Server)
- Setup correct .env values
```
cd server
```
```
npm i
```

## RUN
```
node entry.js
```

## DOTENV REQUIREMENTS

[Express: Environment variables using dotenv](https://www.npmjs.com/package/dotenv#-documentation)

The .env for the server is distributed throughout the application to conceal the values of application identity.

- LISTENING_PORT=yourport
- NODE_ENV=devorproduction
- CORS_ALLOWED_DOMAINS=["http://localhost", "https://example.com"]
- SERVER_ORIGIN=http://localhost
- DB_CONNECTION_STRING=your-database.connectionstring.goes-here-it.is.provided.byyourdbhost || localhost
- DB_USER=db_username
- DB_PASS=db_password
- DB_NAME=db_name
- AUTH0_AUDIENCE=https://your-audience-here
- AUTH0_DOMAIN=your.domain.here.com

## MySQL DB USER REQUIREMENTS

```
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  auth0Id VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255),
  username VARCHAR(255),
  profilePicture VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user'
);
```
Add columns to the user table: 
```
ALTER TABLE users
  ADD COLUMN bio TEXT DEFAULT NULL,
  ADD COLUMN joinedAt DATETIME DEFAULT CURRENT_TIMESTAMP;
```
Be sure to update the frontend to sync account data if necessary.