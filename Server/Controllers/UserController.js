const userService = require('../Services/UserService');
const BaseController = require('../Utils/BaseController');
const { verifyJwt } = require('../Utils/VerifyJWT');
const { attachUserFromAuth, requireOwnership } = require('../Utils/AuthGuard');

class UserController extends BaseController {
  constructor() {
    super('/users');

    this.router
      .get('', this.getAllUsers)
      .get('/:id', this.getUserById)
      .post('', this.registerOrUpdate)
      .put('/:id', verifyJwt, attachUserFromAuth, requireOwnership, this.updateUser)
      .delete('/:id', verifyJwt, attachUserFromAuth, requireOwnership, this.deleteUser);
  }

  async getAllUsers(req, res, next) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async getUserById(req, res, next) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async registerOrUpdate(req, res, next) {
    try {
      const user = await userService.registerOrUpdate(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

async updateUser(req, res, next) {
  try {
    const payload = { ...req.body, id: req.params.id };
    const user = await userService.updateUser(payload);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

  async deleteUser(req, res, next) {
    try {
      const result = await userService.deleteUser(req.params.id);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = UserController;
