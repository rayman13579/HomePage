const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
          title: 'Rayman',
          link: 'login',
          text: 'Login!'
    });
});

module.exports = router;