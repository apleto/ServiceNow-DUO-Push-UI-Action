// Initializes the `pushes` service on path `/pushes`
const { Pushes } = require('./pushes.class');
const createModel = require('../../models/pushes.model');
const hooks = require('./pushes.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pushes', new Pushes(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pushes');

  service.hooks(hooks);
};
