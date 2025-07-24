require('dotenv').config();
const express = require('express');
const app = express();

const port = process.env.LISTENING_PORT || 3001;
const serverOrigin = process.env.SERVER_ORIGIN || `http://localhost`;

// Parse and clean allowed CORS domains
let allowedDomains = [];
try {
  allowedDomains = process.env.CORS_ALLOWED_DOMAINS
    ? process.env.CORS_ALLOWED_DOMAINS.split(',').map(d => d.trim())
    : [];
} catch (error) {
  console.error('[CORS_ALLOWED_DOMAINS]:', error);
}

// In development, allow everything
if (process.env.NODE_ENV !== 'production') {
  allowedDomains = ['*'];
}

// Middleware: CORS + Security Headers
app.use((req, res, next) => {
  const requestOrigin = req.headers.origin;

  if (allowedDomains.includes('*') || allowedDomains.includes(requestOrigin)) {
    res.setHeader('Access-Control-Allow-Origin', allowedDomains.includes('*') ? '*' : requestOrigin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');

  let cspSources = process.env.NODE_ENV !== 'production'
    ? '*'
    : [`'self'`, ...allowedDomains.filter(url => url !== '*')].join(' ');

  res.setHeader(
    'Content-Security-Policy',
    process.env.NODE_ENV !== 'production'
      ? "default-src * 'unsafe-inline' 'unsafe-eval'"
      : `default-src ${cspSources}; script-src ${cspSources}; style-src ${cspSources}`
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register Controllers
const UserController = require('./Controllers/UserController');
const userController = new UserController();
app.use(userController.mount, userController.router);

app.listen(port, () => {
  console.log(`Server is running on ${serverOrigin}:${port}`);
});