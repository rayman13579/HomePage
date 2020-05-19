const crypto = require('crypto');

module.exports = {
    genAuthToken: () => crypto.randomBytes(30).toString('hex'),
    hashPassword: (password) => crypto.createHash('sha256').update(password).digest('base64'),
    users: [
        {
            username: 'Doe',
            password: 'n4bQgYhMfWWaL+qgxVrQFaO/TxsrC4Is0V1sFbDwCgg='
        }
    ],
    authTokens: {},
    requireAuth: (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.render('login', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
        }
    }
}