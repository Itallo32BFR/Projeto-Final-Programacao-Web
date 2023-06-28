const Usuario = require('../models/usuario')

function loginView(req, res){
    res.render("usuario/login.html", {});
}

function verificarAuth(req, res, next) {
    if (req.session.autorizado) {
        console.log('Usuário autorizado!')
        next()
    }
    else {
        console.log('Usuário não autorizado!')
        res.redirect('/login')
    }
}

async function autenticar(req, res) {
    const usuario =  await Usuario.findOne({ where: { email: req.body.email, password: req.body.password}});
    if (usuario !== null) {
        req.session.autorizado = true
        req.session.usuario = usuario
        res.redirect(`/usuario/${usuario.id}/selecionarConta`)
    }
    else {
        let erro_login = true
        res.render('usuario/login.html', { erro_login })
    }
}

function sair(req, res) {
    req.session.destroy(function (err) {
        console.log('Usuario não mais autorizado!')
    })
    let sucesso_saida = true
    res.render('usuario/login.html', { sucesso_saida })
}

module.exports =  {
    loginView,
    verificarAuth,
    autenticar,
    sair
};