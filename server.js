const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const _ = require('lodash');
const package = require('./package');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

const users = require('./users');
console.log('users:');
console.log(users);

const API_KEY = '123abcXYZ';

app.use(function (req, res, next) {
  if (req.get('X-API-KEY') !== API_KEY) {
    return res.status(401).json({ message: 'Missing or invalid API key.' });
  }

  next();
});

app.post('/authenticate', function(req, res) {
  console.log('req.body:', req.body);

  const user = _.find(users, { 
    email: req.body.username, 
    password: req.body.password 
  });

  if (user) {
    res.json(_.omit(user, ['password', 'permissions']));
  } else {
    res.status(400).json({ message: 'Invalid username and/or password.' });
  }
});

app.get('/users/:id/permissions', function (req, res) {
  console.log('req.params:', req.params);

  const user = _.find(users, { 
    id: req.params.id 
  });

  if (user) {
    res.json(user.permissions);
  } else {
    res.status(404).json({ message: 'User not found.' });
  }  
});

const PORT = 5000;

app.listen(PORT, function () {
  console.log(`${package.description}: listening on http://localhost:${PORT}`);
});
