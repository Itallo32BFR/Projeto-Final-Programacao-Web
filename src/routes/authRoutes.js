const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.get('/login', authController.loginView);
router.post('/autenticar', authController.autenticar);
router.post('/sair', authController.sair);

module.exports = router;