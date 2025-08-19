const agen = require("./agenModel");
const kecamatan = require("./kecamatanModel");
const jenis = require("./jenisModel");
const kapal = require("./kapalModel");
const kategoriMuatan = require("./kategoriMuatanModel");
const muatan = require("./muatanModel");
const nahkoda = require("./nahkodaModel");
const perjalanan = require("./perjalananModel");
const ppk = require("./ppkModel");
const spb = require("./spbModel");
const kabupaten = require("./kabupatenModel");
const negara = require("./negaraModel");

jenis.hasMany(kapal, {foreignKey: "id_jenis", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.belongsTo(jenis, {foreignKey: "id_jenis", onDelete: "CASCADE", onUpdate: "CASCADE"})

negara.hasMany(kapal, {foreignKey: "id_bendera", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.belongsTo(negara, {foreignKey: "id_bendera", onDelete: "CASCADE", onUpdate: "CASCADE"})

ppk.hasMany(perjalanan, {foreignKey: "id_ppk", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(ppk, {foreignKey: "id_ppk", onDelete: "CASCADE", onUpdate: "CASCADE"})

spb.hasOne(perjalanan, {foreignKey: "id_spb", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(spb, {foreignKey: "id_spb", onDelete: "CASCADE", onUpdate: "CASCADE"})

kapal.hasMany(perjalanan, {foreignKey: "id_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kapal, {foreignKey: "id_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

nahkoda.hasMany(perjalanan, {foreignKey: "id_nahkoda", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(nahkoda, {foreignKey: "id_nahkoda", onDelete: "CASCADE", onUpdate: "CASCADE"})

kabupaten.hasMany(perjalanan, {foreignKey: "id_kedudukan_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kabupaten, {foreignKey: "id_kedudukan_kapal", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_datang_dari", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {foreignKey: "id_datang_dari", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_tempat_singgah", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {foreignKey: "id_tempat_singgah", onDelete: "CASCADE", onUpdate: "CASCADE"})

kecamatan.hasMany(perjalanan, {foreignKey: "id_tujuan_akhir", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(kecamatan, {foreignKey: "id_tujuan_akhir", onDelete: "CASCADE", onUpdate: "CASCADE"})

agen.hasMany(perjalanan, {foreignKey: "id_agen", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.belongsTo(agen, {foreignKey: "id_agen", onDelete: "CASCADE", onUpdate: "CASCADE"})

perjalanan.hasMany(muatan, {foreignKey: "id_perjalanan", onDelete: "CASCADE", onUpdate: "CASCADE"})

muatan.belongsTo(perjalanan, {foreignKey: "id_perjalanan", onDelete: "CASCADE", onUpdate: "CASCADE"})

kategoriMuatan.hasMany(muatan, {foreignKey: "id_kategori_muatan", onDelete: "CASCADE", onUpdate: "CASCADE"})

muatan.belongsTo(kategoriMuatan, {foreignKey: "id_kategori_muatan", onDelete: "CASCADE", onUpdate: "CASCADE"})

module.exports = {agen, kecamatan, kabupaten, negara, jenis, kapal, kategoriMuatan, muatan, nahkoda, perjalanan, ppk, spb}