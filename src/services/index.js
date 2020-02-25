const users = require('./users/users.service.js');
const pushes = require('./pushes/pushes.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(pushes);
};
