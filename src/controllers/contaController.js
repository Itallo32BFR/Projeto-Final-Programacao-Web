const Conta = require('../models/conta');
const Usuario = require('../models/usuario');
const Pessoa = require('../models/pessoa');

function cadastrarContaView(req, res) {
  let usuario_id = req.params.usuario_id;
  res.render("conta/cadastrarConta.html", { usuario_id });
}

function cadastrarConta(req, res) {
  let usuario_id = req.params.usuario_id;
  let conta = {
      usuario_id: usuario_id,
      numero: req.body.numero,
      nome: req.body.nome,
      data_abertura: new Date(),
      saldo: 0
  };
  
  Conta.create(conta)
    .then(function (novaConta) {
      res.render("conta/cadastrarConta.html", { usuario_id, sucesso: true });
    })
    .catch(function (erro) {
      res.render("conta/cadastrarConta.html", { usuario_id, erro });
    });
}

function listarContas(req, res) {
  let usuario_id = req.params.usuario_id;

  Conta.findAll({ where: { usuario_id: usuario_id } })
    .then(function (contas) {
      res.render("conta/listarContas.html", { contas });
    })
    .catch(function (erro) {
      res.render("conta/listarContas.html", { erro });
    });
}

async function selecionarConta(req, res) {
  try {
    const usuario_id = req.params.usuario_id;
    const usuario = await Usuario.findByPk(usuario_id, {
      include: [Pessoa]
    });

    let nomeUsuario = '';

    if (usuario) {
      nomeUsuario = usuario.pessoa.nome;

      const contas = await Conta.findAll({
        where: { usuario_id },
        include: [
          {
            model: Usuario,
            include: [Pessoa]
          }
        ]
      });
      const idPessoaUsuario = usuario.pessoa_id;

      res.render("conta/selecionarConta.html", { contas, nomeUsuario, idPessoaUsuario });
    } else {
      res.render("conta/selecionarConta.html", { contas: [], nomeUsuario });
    }
  } catch (error) {
    res.render("conta/selecionarConta.html", { erro: error.message });
  }
}

function consultarSaldo(req, res) {
  let conta_id = req.params.conta_id;
  Conta.findByPk(conta_id)
    .then(function (conta) {
      res.render("conta/consultarSaldo.html", { conta, numeroContaOrigem: conta.numero });
    })
    .catch(function (erro) {
      res.render("conta/consultarSaldo.html", { erro });
    });
}

async function editarContaView(req, res) {
  try {
    let id = req.params.id;
    const conta = await Conta.findByPk(id);
    res.render('conta/editarConta.html', { conta });
  } catch (error) {
    res.render('conta/editarConta.html', { erro: error.message });
  }
}

async function editarConta(req, res) {
  const conta = {
    nome: req.body.nome
  };

  try {
    await Conta.update(
      conta,
      {
        where: {
          id: req.body.id,
        },
      }
    );

    const id = req.body.id;
    const contaAtualizada = await Conta.findByPk(id);
    res.render("conta/editarConta.html", { conta: contaAtualizada, sucesso: true });
  } catch (erro) {
    res.render("conta/editarConta.html", { conta, erro });
  }
}

async function excluirContaView(req, res) {
  try {
      let id = req.params.id;
      const conta = await Conta.findByPk(id);
      res.render('conta/excluirConta.html', { conta });
    } catch (error) {
      res.render('conta/excluirConta.html', { erro: error.message });
    }
}

async function excluirConta(req, res) {
  try {
      const id = req.body.id;
      await Conta.destroy({
          where: {
              id: id
          }
      })
          .then(function(sucesso) {
              const usuario_id = req.params.usuario_id;
              res.redirect(`/usuario/${usuario_id}/selecionarConta`);
          })
          .catch(function(erro) {
              console.log(erro);
              const usuario_id = req.params.usuario_id;
              res.redirect(`/usuario/${usuario_id}/selecionarConta`);
          });
    } catch (error) {
      res.render('conta/excluirConta.html', { erro: error.message });
    }
}

module.exports = {
  cadastrarContaView,
  cadastrarConta,
  listarContas,
  selecionarConta,
  consultarSaldo,
  editarContaView,
  editarConta,
  excluirContaView,
  excluirConta
};