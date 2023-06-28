const express = require('express');
const router = express.Router();

const contaController = require('../controllers/contaController');
const authController = require('../controllers/authController');

router.get('/usuario/:usuario_id/conta/cadastrarConta', authController.verificarAuth, contaController.cadastrarContaView);
router.post('/usuario/:usuario_id/conta/cadastrarConta', authController.verificarAuth, contaController.cadastrarConta);

router.get('/usuario/:usuario_id/listarContas', contaController.listarContas);
router.get('/usuario/:usuario_id/selecionarConta', authController.verificarAuth, contaController.selecionarConta);
router.get('/conta/:conta_id/consultarSaldo', authController.verificarAuth, contaController.consultarSaldo);

router.get('/usuario/:usuario_id/conta/:id/editarConta', authController.verificarAuth, contaController.editarContaView);
router.post('/usuario/:usuario_id/conta/:id/editarConta', authController.verificarAuth, contaController.editarConta);

router.get('/usuario/:usuario_id/conta/:id/excluirConta', authController.verificarAuth, contaController.excluirContaView);
router.post('/usuario/:usuario_id/conta/:id/excluirConta', authController.verificarAuth, contaController.excluirConta);

module.exports = router;