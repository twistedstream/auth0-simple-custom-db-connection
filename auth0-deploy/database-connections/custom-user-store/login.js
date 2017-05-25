function login (email, password, callback) {
  request.post({
    url:  'https://' + configuration.API_HOSTNAME + '/authenticate',
    json: {
      username: email,
      password: password
    },
    headers: {
      'X-API-KEY': configuration.API_KEY
    }
  }, function (err, response, body) {
    // check for errors
    if (err) {
      return callback(err);
    }
    if (response.statusCode === 400) {
      return callback(new WrongUsernameOrPasswordError(email, body.message));
    }
    if (response.statusCode !== 200) {
      return callback(new Error(body.message));
    }
                 
    // authentication was successful, return user info
    callback(null, {
      user_id: body.id,
      nickname: body.nickname,
      email:   body.email,
      given_name: body.first_name,
      family_name: body.last_name,
      name: body.first_name + ' ' + body.last_name
    });
  });
}
