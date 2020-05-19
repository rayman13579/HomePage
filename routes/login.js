const express = require('express');
const router = express.Router();
const helper = require('../helper.js');

router.get('/', function(req, res, next) {
   res.render('login');
});

router.post('/', (req, res) => {
    let { username, password } = req.body;
    let hashed = helper.hashPassword(password);
    let user = helper.users.find(user => user.username === username && user.password === hashed);
    if (user) {
        let authToken = helper.genAuthToken();
        helper.authTokens[authToken] = user;

        res.cookie('AuthToken', authToken);
        res.redirect('/test');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = router;