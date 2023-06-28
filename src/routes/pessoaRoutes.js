const express = require('express');
const router = express.Router();

const pessoaController = require('../controllers/pessoaController');
const authController = require('../controllers/authController');

router.get('/pessoa/cadastrar', pessoaController.cadastrarView);
router.post('/pessoa/cadastrar', pessoaController.cadastrarPessoa);

router.get('/pessoa/listar', pessoaController.listarView);

router.get('/pessoa/editar/:id', authController.verificarAuth, pessoaController.editarView);
router.post('/pessoa/editar', authController.verificarAuth, pessoaController.editarPessoa);

router.get('/pessoa/excluir/:id', authController.verificarAuth, pessoaController.excluirView);
router.post('/pessoa/excluir', authController.verificarAuth, pessoaController.excluirPessoa);

module.exports = router;