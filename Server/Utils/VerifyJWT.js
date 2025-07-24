const { expressjwt: jwt } = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const userService = require("../Services/UserService");

const domain = process.env.AUTH0_DOMAIN;
const audience = process.env.AUTH0_AUDIENCE;

const verifyJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksUri: `https://${domain}/.well-known/jwks.json`,
  }),
  audience,
  issuer: `https://${domain}/`,
  algorithms: ["RS256"],
  requestProperty: "auth" // token payload will be at req.auth
});

module.exports = {
  verifyJwt
};