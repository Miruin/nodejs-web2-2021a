const express = require('express');
const router = express.Router();
const passport = require('passport');

const {eliminar} = require('../controller/eliminar');
const {config} = require('../controller/modify');

router.get('/', (req, res)=>{
    res.render('index.ejs');
});

router.get('/login', (req, res)=>{
    res.render('login.ejs');
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/cliente',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/registro', (req, res)=>{
    res.render('registro.ejs');
});

router.post('/registro', passport.authenticate('regis', {
    successRedirect: '/',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/cliente', auth, (req, res)=>{
    res.render('cliente.ejs');
});

router.get('/config', auth, (req, res)=>{
    res.render('config.ejs');
});

router.post('/config', auth, config);

router.get('/logout', auth, (req, res) =>{
    req.session.destroy();
    req.logout();
    res.redirect('/cliente');   
});

router.get('/eliminar', auth, eliminar);

function auth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

module.exports = router;