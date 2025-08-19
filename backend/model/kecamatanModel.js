const { DataTypes } = require('sequelize')
const {db} = require('../config/db')

const kecamatan = db.define('kecamatan', {
    id_kecamatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kecamatan: DataTypes.STRING
}, 
{
    freezeTableName: true
})

module.exports = kecamatan