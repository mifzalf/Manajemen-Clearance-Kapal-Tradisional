const { DataTypes } = require('sequelize')
const {db} = require('../config/db')
const users = require('./userModel')

const logUser = db.define("log_user", {
    id_log_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    waktu: DataTypes.TIME,
    id_user: {
        type: DataTypes.INTEGER,
        references: {
            model: users,
            key: "id_user"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    aksi: DataTypes.ENUM("CREATE", "UPDATE", "DELETE", "LOGIN"),
    jenis_data: DataTypes.STRING,
    data_diubah: DataTypes.STRING
})

module.exports = logUser