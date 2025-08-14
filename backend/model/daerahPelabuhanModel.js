const { DataTypes } = require('sequelize')
const {db} = require('../config/db')

const daerahPelabuhan = db.define('daerah_pelabuhan', {
    id_daerah_pelabuhan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_daerah_pelabuhan: DataTypes.INTEGER
}, 
{
    freezeTableName: true
})

module.exports = daerahPelabuhan