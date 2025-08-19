const { DataTypes } = require('sequelize')
const {db} = require('../config/db')

const kabupaten = db.define('kabupaten', {
    id_kabupaten: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kabupaten: DataTypes.STRING
}, 
{
    freezeTableName: true
})

module.exports = kabupaten