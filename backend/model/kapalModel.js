const { DataTypes } = require("sequelize")
const {db} = require("../config/db")
const jenis = require("./jenisModel")

const kapal = db.define('kapal', {
    id_kapal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nama_kapal: DataTypes.STRING,
    id_jenis: {
        type: DataTypes.INTEGER,
        references: {
            model: jenis,
            key: "id_jenis"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    bendera: DataTypes.ENUM("RI"),
    gt: DataTypes.INTEGER,
    nt: DataTypes.INTEGER,
    nomor_selar: DataTypes.INTEGER,
    tanda_selar: DataTypes.STRING,
    nomor_selar: DataTypes.STRING,
    nomor_selar: DataTypes.STRING,
}, 
{
    freezeTableName: true
})

module.exports = kapal