const assert = require('assert');
const app = require('../../src/app');

describe('\'pushes\' service', () => {
  it('registered the service', () => {
    const service = app.service('pushes');

    assert.ok(service, 'Registered the service');
  });
});
