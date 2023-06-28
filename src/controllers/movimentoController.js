const Movimento = require('../models/movimento');
const Conta = require('../models/conta');

const realizarTransferenciaView = (req, res) => {
    const { numeroContaOrigem } = req.params;
    let contaId = req.params.conta_id;
    res.render('movimento/realizarTransferencia.html', { numeroContaOrigem, contaId });
};

const realizarTransferencia = async (req, res) => {
    const { numeroContaOrigem } = req.params;
    const { valor, conta_destino, observacao } = req.body;

    try {
        const numeroContaOrigemObj = await Conta.findOne({ where: { numero: numeroContaOrigem } });
        if (!numeroContaOrigemObj) {
            throw new Error('Conta de origem não encontrada.');
        }
        if (numeroContaOrigemObj.saldo < valor) {
            throw new Error('Saldo insuficiente!');
        }

        const conta_destinoObj = await Conta.findOne({ where: { numero: conta_destino } });
        if (!conta_destinoObj) {
            throw new Error('Número de conta inválido!');
        }

        numeroContaOrigemObj.saldo -= valor;
        await numeroContaOrigemObj.save();

        conta_destinoObj.saldo = parseFloat(conta_destinoObj.saldo) + parseFloat(valor);
        await conta_destinoObj.save();

        await Movimento.create({
            conta_id: numeroContaOrigemObj.id,
            tipo: 'D',
            data_movimento: new Date(),
            valor,
            conta_origem: numeroContaOrigem,
            conta_destino: conta_destino,
            observacao
        });

        await Movimento.create({
            conta_id: conta_destinoObj.id,
            tipo: 'C',
            data_movimento: new Date(),
            valor,
            conta_origem: numeroContaOrigem,
            conta_destino: conta_destino,
            observacao
        });

        let contaId = req.params.conta_id;
        res.render('movimento/realizarTransferencia.html', { sucesso: true, contaId, numeroContaOrigem });
    } catch (error) {
        let contaId = req.params.conta_id;
        res.render('movimento/realizarTransferencia.html', { erro: error.message, contaId, numeroContaOrigem });
    }
};

const listarMovimentos = async (req, res) => {
    try {
        const movimentos = await Movimento.findAll({
            include: [{ model: Conta }],
        });

        res.render('movimento/listarMovimentos.html', { movimentos });
    } catch (error) {
        res.render('movimento/listarMovimentos.html', { erro: error.message });
    }
};

async function historicoMovimentos(req, res) {
    try {
        const contaId = req.params.conta_id;
        const conta = await Conta.findByPk(contaId, {
            include: [
                {
                    model: Movimento,
                    order: [['data_movimento', 'ASC']]
                }
            ]
        });

        if (!conta) {
            throw new Error('Conta não encontrada');
        }

        res.render("movimento/historicoMovimentos.html", { conta });
    } catch (error) {
        res.render("movimento/historicoMovimentos.html", { erro: error.message });
    }
}

function realizarDepositoView(req, res) {
    res.render('movimento/realizarDeposito.html', {});
};

async function realizarDeposito(req, res) {
    const { conta_destino, valor } = req.body;

    try {
        const conta_destinoObj = await Conta.findOne({ where: { numero: conta_destino } });
        if (!conta_destinoObj) {
            throw new Error('Número de conta inválido!');
        }
        conta_destinoObj.saldo = parseFloat(conta_destinoObj.saldo) + parseFloat(valor);
        await conta_destinoObj.save();

        await Movimento.create({
            conta_id: conta_destinoObj.id,
            tipo: 'C',
            data_movimento: new Date(),
            valor,
            conta_destino: conta_destino,
            observacao: 'DEPOSITO'
        });

        res.render("movimento/realizarDeposito.html", { sucesso: true });
    } catch (error) {
        res.render("movimento/realizarDeposito.html", { erro: error.message });
    }
}

module.exports = {
    realizarTransferenciaView,
    realizarTransferencia,
    listarMovimentos,
    historicoMovimentos,
    realizarDepositoView,
    realizarDeposito
}