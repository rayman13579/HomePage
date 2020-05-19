const express = require('express');
const router = express.Router();
const helper = require('../helper');
const db = require('../db');

router.get('/', (req, res, next) => {
  res.render('register');
});

router.post('/', async (req, res) => {
    let { username, password, confirm } = req.body;

    if (!(password === '')) {
        if (password === confirm) {
            if ((await db.find('user')).find(user => user.username === username)) {
              res.render('register', {
                message: 'Username taken',
                messageClass: 'alert-danger'
              });
              return;
            }

            let hashed = helper.hashPassword(password);
            await db.insert('user', username, hashed);

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
    } else {
        res.render('register', {
            message: 'Please enter a password',
            messageClass: 'alert-danger'
        })
    }
});

module.exports = router;