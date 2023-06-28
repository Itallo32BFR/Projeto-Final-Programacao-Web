const Pessoa = require('../models/pessoa')
const Usuario = require('../models/usuario')
const usuarioController = require('./usuarioController')

function cadastrarView(req, res) {
    res.render("pessoa/cadastrar.html", {});
}

function cadastrarPessoa(req, res) {
    let pessoa = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        data_nascimento: req.body.data_nascimento,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cep: req.body.cep
    }

    Pessoa.create(pessoa).then((result) => {
        let usuario = {
            pessoa_id: result.id,
            email: req.body.email,
            password: req.body.password
        }
        usuarioController.salvarUsuario(usuario)
        res.render("pessoa/cadastrar.html", { pessoa });
    }).catch((err) => {
        console.log(err)
        let erro = err
        res.render("pessoa/cadastrar.html", { erro });
    })
}

function listarView(req, res) {
    Pessoa.findAll().then((pessoas) => {
        Usuario.findAll().then((usuarios) => {
            res.render("pessoa/listar.html", { pessoas, usuarios });
        }).catch((err) => {
            console.log(err);
            let erro = err;
            res.render("pessoa/listar.html", { erro });
        });
    }).catch((err) => {
        console.log(err)
        let erro = err
        res.render("pessoa/listar.html", { erro });
    })
}

function editarView(req, res) {
    let id = req.params.id
    let pessoa;
    Pessoa.findByPk(id).then(function (pessoa) {
        res.render("pessoa/editar.html", { pessoa });
    });
}

async function editarPessoa(req, res) {
    const pessoa = {
        nome: req.body.nome,
        data_nascimento: req.body.data_nascimento,
        telefone: req.body.telefone,
        endereco: req.body.endereco,
        cep: req.body.cep,
        cpf: req.body.cpf
    };

    try {
        await Pessoa.update(
            pessoa,
            {
                where: {
                    id: req.body.id,
                },
            }
        );
        const id = req.body.id;
        const pessoaAtualizada = await Pessoa.findByPk(id);
        res.render("pessoa/editar.html", { pessoa: pessoaAtualizada, sucesso: true });
    } catch (erro) {
        res.render("pessoa/editar.html", { pessoa, erro });
    }
}

function excluirView(req, res) {
    let id = req.params.id
    let pessoa;
    Pessoa.findByPk(id).then(function (pessoa) {
        Usuario.findOne(
            {
                where: {
                    pessoa_id: pessoa.id
                }
            }
        ).then(function (usuario) {
            res.render("pessoa/excluir.html", { pessoa, usuario });
        })
    });
}

function excluirPessoa(req, res) {
    let id = req.body.id;

    Usuario.destroy({
        where: {
            pessoa_id: id,
        }
    })
        .then(function () {
            Pessoa.destroy(
                {
                    where: {
                        id: id,
                    },
                }
            ).then(function (sucesso) {
                res.redirect("/pessoa/cadastrar");
            })
                .catch(function (erro) {
                    console.log(erro);
                    res.redirect("/pessoa/cadastrar");
                });
        })
        .catch(function (erro) {
            console.log(erro);
            res.redirect("/pessoa/cadastrar");
        });
}

module.exports = {
    cadastrarView,
    cadastrarPessoa,
    listarView,
    editarView,
    editarPessoa,
    excluirView,
    excluirPessoa,
};