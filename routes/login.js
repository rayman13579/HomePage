const express = require('express');
const router = express.Router();
const helper = require('../helper.js');
const db = require('../db');

router.get('/', function(req, res, next) {
   res.render('login');
});

router.post('/', async (req, res) => {
    let { username, password } = req.body;
    let hashed = helper.hashPassword(password);
    let user = (await db.find('user')).find(user => user.username === username && user.password === hashed);
    if (user) {
        let authToken = helper.genAuthToken();

        await db.insert('token', authToken, user);

        res.cookie('AuthToken', authToken, { maxAge: 10 * 60000 });
        res.redirect('/test');
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});

module.exports = router;