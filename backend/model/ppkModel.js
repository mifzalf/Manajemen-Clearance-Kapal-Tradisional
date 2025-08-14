const { DataTypes } = require('sequelize')
const {db} = require('../config/db')

const ppk = db.define('ppk', {
    id_ppk: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_ppk: DataTypes.STRING
}, 
{
    freezeTableName: true
})

module.exports = ppk