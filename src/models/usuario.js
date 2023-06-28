const Sequelize = require('sequelize');
const database = require('../db');
const Conta = require('./conta');

const Usuario = database.define('usuario', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pessoa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.CHAR(32),
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.CHAR(32),
        allowNull: false
    }
})

Usuario.hasMany(Conta, {
    foreignKey: 'usuario_id'
})

Conta.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    allowNull: false
})

module.exports = Usuario;