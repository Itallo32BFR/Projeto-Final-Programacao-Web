const Sequelize = require('sequelize');
const database = require('../db');

const Movimento = database.define('movimento', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    conta_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tipo: {
        type: Sequelize.CHAR(1),
        allowNull: false
    },
    data_movimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    conta_origem: {
        type: Sequelize.BIGINT
    },
    conta_destino: {
        type: Sequelize.BIGINT
    },
    observacao: {
        type: Sequelize.CHAR(255)
    },
})

module.exports = Movimento;