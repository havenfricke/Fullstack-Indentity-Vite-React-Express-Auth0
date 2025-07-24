class User {
  constructor({ id, auth0Id, email, username, role = 'user', profilePicture }) {
    this.id = id;
    this.auth0Id = auth0Id;
    this.email = email;
    this.username = username;
    this.role = role;
    this.profilePicture = profilePicture;
  }
}
module.exports = User;
