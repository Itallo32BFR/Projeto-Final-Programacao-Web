const Sequelize = require('sequelize');
const database = require('../db');
const Movimento = require('./movimento');

const Conta = database.define('conta', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    numero: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    nome: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    data_abertura: {
        type: Sequelize.DATE,
        allowNull: false
    },
    saldo: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }
})

Conta.hasMany(Movimento, {
    foreignKey: 'conta_id'
})

Movimento.belongsTo(Conta, {
    foreignKey: 'conta_id',
    allowNull: false
})

module.exports = Conta;