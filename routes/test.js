const express = require('express');
const router = express.Router();
const helper = require('../helper');

router.get('/', helper.requireAuth, function(req, res, next) {
   if (req.user) {
      res.render('test', { title: 'Test', text: 'You\'re logged in now, yay \\o/ Super Secret Stuff Here' });
   } else {
      res.render('login', {
         message: 'Please login to continue',
         messageClass: 'alert-danger'
      });
   }
});

module.exports = router;
