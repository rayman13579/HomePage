const crypto = require('crypto');

module.exports = {
    genAuthToken: () => crypto.randomBytes(30).toString('hex'),
    hashPassword: (password) => crypto.createHash('sha256').update(password).digest('base64'),
    requireAuth: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.render('login', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
        }
    },
    wait: (ms) =>new Promise(resolve => setTimeout(resolve, ms))
}