const express = require('express');
const router = express.Router();

const movimentoController = require('../controllers/movimentoController');
const authController = require('../controllers/authController');

router.get('/conta/:conta_id/numeroContaOrigem/:numeroContaOrigem/realizarTransferencia', authController.verificarAuth, movimentoController.realizarTransferenciaView);
router.post('/conta/:conta_id/numeroContaOrigem/:numeroContaOrigem/realizarTransferencia', authController.verificarAuth, movimentoController.realizarTransferencia);

router.get('/conta/listarMovimentos', movimentoController.listarMovimentos);
router.get('/conta/:conta_id/historicoMovimentos', authController.verificarAuth, movimentoController.historicoMovimentos);

router.get('/movimento/realizarDeposito', movimentoController.realizarDepositoView);
router.post('/movimento/realizarDeposito', movimentoController.realizarDeposito);

module.exports = router;