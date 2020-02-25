const auth = require('./auth');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/auth', auth());
};
