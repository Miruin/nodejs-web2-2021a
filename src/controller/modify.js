const user = require('../model/user');

const config = async(req, res, done) => {
    let usuario = req.body.usuarioActualizado
    console.log(usuario);
    const u = await user.findOne({'usuario': usuario});
    const u2 = await user.findOne({'usuario': req.session.sesionUser});
    if(u){
        u2.nombre = req.body.nombreActualizado;
        u2.apellido = req.body.apellidoActualizado;
        u2.correo = req.body.correoActualizado;
        u2.telf = req.body.telfActualizado;
        await u2.save();
        console.log(u);
        console.log(u2);
        res.redirect('/cliente')
    } else {
        u2.usuario = usuario;
        u2.nombre = req.body.nombreActualizado;
        u2.apellido = req.body.apellidoActualizado;
        u2.correo = req.body.correoActualizado;
        u2.telf = req.body.telfActualizado;
        await u2.save();
        console.log(u);
        console.log(u2);
        res.redirect('/cliente')
    }
};

module.exports = {
    config
};