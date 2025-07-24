const express = require('express');

class BaseController {
  constructor(mount) {
    if (typeof mount !== 'string') {
      throw new Error('[CONTROLLER REGISTRATION ERROR]: No specified path');
    }
    if (mount[0] !== '/') {
      mount = '/' + mount;
    }
    this.mount = mount;
    this.router = express.Router({ mergeParams: true });
  }
}

module.exports = BaseController;

// this BaseController class provides a standardized 
// way to set up controllers by validating a mount path 
// and initializing a router. This helps ensure consistency 
// and reusability across different controllers in your 
// Express application

// A new Express router is created with the option { mergeParams: true }, 
// which allows route parameters defined in parent routers to be 
// accessible in the child router. This router will be used to define 
// the routes for the controller.