function (user, context, callback) {
  var userId = user.user_id.split('|')[1];
  console.log('userId:', userId);

  request.get({
    url:  'https://' + configuration.API_HOSTNAME + '/user-permissions/' + userId,
    json: true,
    headers: {
      'X-API-KEY': configuration.API_KEY
    }
  }, function (err, response, body) {
    // check for errors
    if (err) {
      return callback(err);
    }
    
    console.log('response.statusCode:', response.statusCode);
    console.log('body:', body);

    if (response.statusCode === 200) {
      user.permissions = body;
    }

    callback(null, user, context);
  });
}
