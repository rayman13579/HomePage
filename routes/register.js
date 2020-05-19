const express = require('express');
const router = express.Router();
const helper = require('../helper');

router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', (req, res) => {
    let { username, password, confirm } = req.body;

    if (password === confirm) {
        if (helper.users.find(user => user.username === username)) {
          res.render('register', {
            message: 'Username taken',
            messageClass: 'alert-danger'
          });
        }

        let hashed = helper.hashPassword(password);
        console.log(hashed);
        helper.users.push({ username, password: hashed });

        res.render('login', {
            message: 'Registration successful, please log in',
            messageClass: 'alert-success'
        })
    } else {
        res.render('register', {
            message: 'Passwords do not match',
            messageClass: 'alert-danger'
        })
    }
});

module.exports = router;