const agen = require("./agenModel");
const kecamatan = require("./kecamatanModel");
const jenis = require("./jenisModel");
const kapal = require("./kapalModel");
const kategoriMuatan = require("./kategoriMuatanModel");
const muatan = require("./muatanModel");
const nahkoda = require("./nahkodaModel");
const perjalanan = require("./perjalananModel");
const spb = require("./spbModel");
const kabupaten = require("./kabupatenModel");
const negara = require("./negaraModel");
const provinsi = require("./provinsiModel");
const users = require("./userModel");
const logUser = require("./logUserModel");

jenis.hasMany(kapal, {foreignKey: "id_jenis", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.belongsTo(jenis, {foreignKey: "id_jenis", onDelete: "CASCADE", onUpdate: "CASCADE"})

negara.hasMany(kapal, {foreignKey: "id_bendera", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.belongsTo(negara, {as: "bendera", foreignKey: "id_bendera", onDelete: "CASCADE", onUpdate: "CASCADE"})

spb.hasOne(perjalanan, {foreignKey: "id_spb", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(spb, {foreignKey: "id_spb", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.hasMany(perjalanan, {foreignKey: "id_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kapal, {foreignKey: "id_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

nahkoda.hasMany(perjalanan, {foreignKey: "id_nahkoda", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(nahkoda, {foreignKey: "id_nahkoda", onDelete: "CASCADE", onUpdate: "CASCADE"})

negara.hasMany(provinsi, {foreignKey: "id_negara", onDelete: "CASCADE", onUpdate: "CASCADE"})

provinsi.belongsTo(negara, {foreignKey: "id_negara", onDelete: "CASCADE", onUpdate: "CASCADE"})

provinsi.hasMany(kabupaten, {foreignKey: "id_provinsi", onDelete: "CASCADE", onUpdate: "CASCADE"})

kabupaten.belongsTo(provinsi, {foreignKey: "id_provinsi", onDelete: "CASCADE", onUpdate: "CASCADE"})

kabupaten.hasMany(kecamatan, {foreignKey: "id_kabupaten", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.belongsTo(kabupaten, {foreignKey: "id_kabupaten", onDelete: "CASCADE", onUpdate: "CASCADE"})

kabupaten.hasMany(perjalanan, {foreignKey: "id_kedudukan_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kabupaten, {as: "kedudukan_kapal", foreignKey: "id_kedudukan_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_datang_dari", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {as: "datang_dari", foreignKey: "id_datang_dari", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_tempat_singgah", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {as: "tempat_singgah", foreignKey: "id_tempat_singgah", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_tujuan_akhir", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {as: "tujuan_akhir", foreignKey: "id_tujuan_akhir", onDelete: "CASCADE", onUpdate: "CASCADE"})

agen.hasMany(perjalanan, {foreignKey: "id_agen", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(agen, {foreignKey: "id_agen", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.hasMany(muatan, {as: "muatans", foreignKey: "id_perjalanan", onDelete: "CASCADE", onUpdate: "CASCADE"})

muatan.belongsTo(perjalanan, {foreignKey: "id_perjalanan", onDelete: "CASCADE", onUpdate: "CASCADE"})

kategoriMuatan.hasMany(muatan, {foreignKey: "id_kategori_muatan", onDelete: "CASCADE", onUpdate: "CASCADE"})

muatan.belongsTo(kategoriMuatan, {as: "kategori_muatan", foreignKey: "id_kategori_muatan", onDelete: "CASCADE", onUpdate: "CASCADE"})

module.exports = {agen, kecamatan, kabupaten, negara, jenis, kapal, kategoriMuatan, muatan, nahkoda, perjalanan, spb, users, logUser}