const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const user = require('../model/user');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const u = await user.findById(id);
    done(null, u);
});


passport.use('regis', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'pw',
    passReqToCallback: true
}, async (req, usuario, pw, done) =>{    

    const u = await user.findOne({'usuario': usuario});
    if(u){
        return done(null, false, req.flash('errorRegistro', 'El usuario ya esta registrado'));
    } else {
        const nu = new user();
        nu.usuario = usuario;
        nu.nombre = req.body.nombre;
        nu.apellido = req.body.apellido;
        nu.pw = nu.encryptpw(pw);
        nu.correo = req.body.correo;
        nu.telf = req.body.telefono;
        await nu.save();
        done(null,nu);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'pw',
    passReqToCallback: true
}, async (req, usuario, pw, done) =>{ 
    const u = await user.findOne({'usuario': usuario});
    if (!u) {
        return done(null, false, req.flash('errorLogin', 'El usuario no se ha registrado'));
    }
    if(!u.comparepw(pw)) {   
        console.log('asd');
        return done(null, false, req.flash('errorLogin', 'Contraseña incorrecta'));
    }
    req.session.sesionUser = usuario;
    done(null, u);
}));

passport.use('config', new LocalStrategy({
    usernameField: 'usuario',
    passwordField: 'pw',
    passReqToCallback: true
}, async(req, usuario, pw, done) => {
    console.log(usuario);
    const u = await user.findOne({'usuario': usuario});
    if(u){

    }
}));