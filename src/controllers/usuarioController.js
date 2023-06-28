const Usuario = require('../models/usuario')

async function salvarUsuario(usuario) {
    try {
        await Usuario.create(usuario);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

function alterarSenhaView(req, res) {
    let pessoa_id = req.params.pessoa_id;
    let usuario;
    Usuario.findByPk(pessoa_id).then(function(usuario) {
        res.render("usuario/alterarSenha.html", { usuario });
    });
}

async function alterarSenha(req, res) {
    const usuario = {
        password: req.body.password
    };

    try {
        await Usuario.update(
            usuario,
            {
                where: {
                    pessoa_id: req.body.pessoa_id
                },
                individualHooks: true
            }
        );

        const pessoa_id = req.body.pessoa_id;
        const usuarioAtualizado = await Usuario.findByPk(pessoa_id);

        res.render("usuario/alterarSenha.html", {usuario: usuarioAtualizado, sucesso: true});
    } catch(erro) {
        res.render("usuario/alterarSenha.html", {usuario, erro})
    }
}

module.exports = {
    salvarUsuario,
    alterarSenhaView,
    alterarSenha
}