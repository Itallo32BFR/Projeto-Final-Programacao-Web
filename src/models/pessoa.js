const Sequelize = require('sequelize');
const database = require('../db');
const Usuario = require('./usuario')
 
const Pessoa = database.define('pessoa', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.CHAR(64),
        allowNull: false
    },
    cpf: {
        type: Sequelize.BIGINT,
        allowNull: false,
        unique: true
    },
    data_nascimento: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telefone: {
        type: Sequelize.BIGINT,
        allowNull: false
    },
    endereco: {
        type: Sequelize.CHAR(255),
        allowNull: false
    },
    cep: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
})

Usuario.belongsTo(Pessoa, {
    foreignKey: 'pessoa_id',
    allowNull: false,
    unique: true
})
 
module.exports = Pessoa;