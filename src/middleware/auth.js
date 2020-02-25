const duo_api = require('@duosecurity/duo_api');
const auth_ikey = process.env.IKEY;
const auth_skey = process.env.SKEY;
const auth_host = process.env.HOST;
const authClient = new duo_api.Client(auth_ikey, auth_skey, auth_host);


console.log(authClient)


module.exports = () => {
  return function auth(req, res) {
    const data = req.body;
    const { app } = req;
    const result_data = {
      affected_user: data.username,
      requested_by: data.requested_by,
      duo_device: null,
      preauth_result: null,
      preauth_status_msg: null,
      auth_result: null,
      auth_status_msg: null
    };
    authClient.jsonApiCall('POST', '/auth/v2/preauth', { limit: 1, username: data.username }, preAuth => {
      const { response } = preAuth;
      result_data.preauth_result = response.result;
      result_data.preauth_status_msg = response.status_msg;
      
      
      if(response.result == 'deny') {
        app.service('pushes').create(result_data);

        res.json({ result: 'user-not-valid' });
      }

      else {
        const phone = response.devices[0];
        result_data.duo_device = phone.device;
        authClient.jsonApiCall('POST', '/auth/v2/auth', { username: data.username, factor: 'push', device: phone.device }, auth => {
          console.log(auth);
          result_data.auth_result = auth.response.result;
          result_data.auth_status_msg = auth.response.status_msg;

          app.service('pushes').create(result_data);
          res.json(auth.response);
        });
      }

    });
  };
};
