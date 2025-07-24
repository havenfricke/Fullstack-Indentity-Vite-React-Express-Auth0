# EXPRESS SERVER - HAVEN FRICKE
- dotenv: ^16.4.7
- express: ^4.21.2
- multer: 1.4.5-lts.1
- mysql2: ^3.12.0

## SETUP
- Create .env file
- Place in root directory
- `cd server`
- `npm i` 

## RUN
- `node entry.js` 

## DOTENV REQUIREMENTS
- LISTENING_PORT=yourport
- NODE_ENV=devorproduction
- CORS_ALLOWED_DOMAINS=["http://localhost", "https://example.com"]
- SERVER_ORIGIN=http://localhost
- DB_CONNECTION_STRING=your-database.connectionstring.goes-here-it.is.provided.byyourdbhost || localhost
- DB_USER=db_username
- DB_PASS=db_password
- DB_NAME=db_name

## MySQL DB REQUIREMENTS

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