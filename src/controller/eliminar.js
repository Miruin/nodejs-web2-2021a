const user = require('../model/user');

const eliminar = async(req, res) => {
    console.log(req.session.sesionUser);
    let usuario = req.session.sesionUser
    console.log(usuario);
    const u = await user.findOneAndRemove({'usuario': usuario});
    res.redirect('/logout');
};

module.exports = {
    eliminar
};