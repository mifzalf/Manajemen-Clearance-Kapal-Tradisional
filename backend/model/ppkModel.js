const { DataTypes } = require('sequelize')
const {db} = require('../config/db')

const ppk = db.define('ppk', {
    id_ppk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    kode_ppk: DataTypes.INTEGER
})

module.exports = ppk