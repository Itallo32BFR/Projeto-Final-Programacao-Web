const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const authController = require('../controllers/authController');

router.get('/usuario/alterarSenha/:pessoa_id', authController.verificarAuth, usuarioController.alterarSenhaView);
router.post('/usuario/alterarSenha', authController.verificarAuth, usuarioController.alterarSenha);

module.exports = router;