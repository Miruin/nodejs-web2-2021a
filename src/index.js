const express = require('express');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const sesion = require('express-session');
const cflash = require('connect-flash');

//initialization
const app = express();
require('./db');
require('./passport/auth');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.set('views engines', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(sesion({
    secret: 'sesionsecreta123',
    resave: false,
    saveUninitialized: false
}));
app.use(cflash())
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res ,next) => {
    app.locals.errorReg = req.flash('errorRegistro');
    app.locals.errorLog = req.flash('errorLogin');
    app.locals.user = req.user;
    next();
});

//routes
app.use(require('./routes/routes'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//listening
app.listen(app.get('port'), () => {

    console.log('server on port: ', app.get('port'));

});