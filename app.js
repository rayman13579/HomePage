const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');
const helper = require('./helper');

var indexRouter = require('./routes/index');
var testRouter = require('./routes/test');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

var app = express();
var appHttp = express();

//redirect all http requests to https
appHttp.get("*", (req, res, next) => res.redirect("https://" + req.headers.host + req.path));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(async (req, res, next) => {
    let authToken = req.cookies['AuthToken'];
    req.user = ((await db.find('token')).find(token => token.token === authToken)) === null ? user.user : 'notfound';
    next();
});

app.use('/', indexRouter);
app.use('/test', testRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404, 'Whoops'));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = {
	app,
	appHttp
}
