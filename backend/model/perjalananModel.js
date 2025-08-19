const { DataTypes } = require('sequelize')
const {db} = require('../config/db')
const ppk = require('./ppkModel')
const spb = require('./spbModel')
const kapal = require('./kapalModel')
const nahkoda = require('./nahkodaModel')
const kecamatan = require('./kecamatanModel')
const agen = require('./agenModel')
const kabupaten = require('./kabupatenModel')

const perjalanan = db.define("perjalanan", {
    id_perjalanan: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    register_bulan: DataTypes.ENUM("januari", "februari", "maret", "april", "mei", "juni", "juli", "agustus", "september", "oktober", "november", "desember"),
    id_ppk: {
        type: DataTypes.INTEGER,
        references: {
            model: ppk,
            key: "id_ppk"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_spb: {
        type: DataTypes.INTEGER,
        references: {
            model: spb,
            key: "id_spb"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    no_urut: DataTypes.STRING,
    id_kapal: {
        type: DataTypes.INTEGER,
        references: {
            model: kapal,
            key: "id_kapal"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_nahkoda: {
        type: DataTypes.INTEGER,
        references: {
            model: nahkoda,
            key: "id_nahkoda"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    jumlah_crew: DataTypes.INTEGER,
    id_kedudukan_kapal: {
        type: DataTypes.INTEGER,
        references: {
            model: kabupaten,
            key: "id_kabupaten"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    tanggal_datang: DataTypes.DATEONLY,
    id_datang_dari: {
        type: DataTypes.INTEGER,
        references: {
            model: kecamatan,
            key: "id_kecamatan"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    tanggal_berangkat: DataTypes.DATEONLY,
    id_tempat_singgah: {
        type: DataTypes.INTEGER,
        references: {
            model: kecamatan,
            key: "id_kecamatan"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_tujuan_akhir: {
        type: DataTypes.INTEGER,
        references: {
            model: kecamatan,
            key: "id_kecamatan"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_agen: {
        type: DataTypes.INTEGER,
        references: {
            model: agen,
            key: "id_agen"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    tanggal_clearance: DataTypes.DATEONLY,
    pukul_agen_clearance: DataTypes.TIME,
    pukul_kapal_berangkat: DataTypes.STRING,
    status_muatan_berangkat: DataTypes.ENUM("NIHIL", "SESUAI MANIFEST")
}, 
{
    freezeTableName: true
})

module.exports = perjalanan