const { DataTypes } = require("sequelize")
const {db} = require("../config/db")

const kategoriMuatan = db.define("kategori_muatan", {
    id_kategori_muatan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kategori_muatan: DataTypes.STRING,
    status_kategori_muatan: DataTypes.STRING
})

module.exports = kategoriMuatan