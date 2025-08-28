const kecamatan = require("../model/kecamatanModel")
const kapal = require("../model/kapalModel")
const nahkoda = require("../model/nahkodaModel")
const perjalanan = require("../model/perjalananModel")
const kabupaten = require("../model/kabupatenModel")
const { Op, Sequelize } = require("sequelize")
const agen = require("../model/agenModel")
let spbController = require("./spbController")
let muatanController = require("./muatanController")
const { db } = require("../config/db")

const getPerjalanan = async (req, res) => {
    try {
        const datas = await perjalanan.findAll()
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getPerjalananById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await perjalanan.findByPk(id)
        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let { muatan } = req.body
        console.log(req.body)
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
            req.body.id_tempat_singgah
        ]
        let kecamatanId = [...new Set(uniqueId)]
        let kecamatanData = await kecamatan.findAll({
            where: {
                id_kecamatan: {
                    [Op.or]: kecamatanId
                }
            }
        })

        if (!kapalData ||
            !nahkodaData ||
            !kabupatenData ||
            kecamatanData.length < kecamatanId.length ||
            !agenData) return res.status(500).json({ msg: "data kapal / nahkoda / daerah / agen tidak ditemukan" })

        console.log(req.body)
        let no_urut
        let tanggalSekarang = new Date()
        let bulanSekarang = `0${tanggalSekarang.getMonth()}`
        let latestData = await perjalanan.findOne({
            order: [['createdAt', 'DESC']]
        })
        console.log(latestData)
        no_urut = bulanSekarang + "01"
        if (latestData) {
            let latestNumber = latestData.no_urut.substring(2)
            latestNumber = parseInt(latestNumber) + 1
            if (String(latestNumber).startsWith(0)) {
                latestNumber = parseInt(latestNumber.substring(1)) + 1
            }
            if (latestNumber < 10) latestNumber = "0" + String(latestNumber)
            no_urut = `${bulanSekarang}${latestNumber}`
        }

        req.body.status_muatan_berangkat = (String(req.body.status_muatan_berangkat).toLowerCase() == "kosong") ? "NIHIL" : "SESUAI MANIFEST"

        let spb = await spbController.storeSpb(req.body.no_spb_asal, t)

        let newPerjalanan = await perjalanan.create({ ...req.body, no_urut, id_spb: spb.id_spb }, { transaction: t })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: newPerjalanan.id_perjalanan }
        })
        console.log(filteredMuatan)
        if (muatan.length > 0) {
            await muatanController.storeMuatan(filteredMuatan, t)
        }

        t.commit()
        return res.status(200).json({ msg: "Berhasil menambahkan data" })
    } catch (error) {
        t.rollback
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updatePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let { muatan } = req.body
        let perjalananData = await perjalanan.findByPk(req.params.id)
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
            req.body.id_tempat_singgah
        ]
        let kecamatanId = [...new Set(uniqueId)]
        let kecamatanData = await kecamatan.findAll({
            where: {
                id_kecamatan: {
                    [Op.or]: kecamatanId
                }
            }
        })

        if (!kapalData ||
            !nahkodaData ||
            !kabupatenData ||
            kecamatanData.length < kecamatanId.length ||
            !agenData) return res.status(500).json({ msg: "data kapal / nahkoda / daerah / agen tidak ditemukan" })

        req.body.status_muatan_berangkat = (String(req.body.status_muatan_berangkat).toLowerCase() == "kosong") ? "NIHIL" : "SESUAI MANIFEST"

        await spbController.updateSpb(req.body.no_spb_asal, perjalananData.id_spb, t)

        let result = await perjalanan.update({ ...req.body }, { where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: req.params.id }
        })
        console.log(filteredMuatan)
        if (data.status_muatan_berangkat)
            await muatanController.updateMuatan(filteredMuatan, req.params.id, t)

        t.commit()
        return res.status(200).json({ msg: "Berhasil memperbarui data" })
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deletePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let data = await perjalanan.findByPk(req.params.id)
        let result = await perjalanan.destroy({ where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })
        await spbController.deleteSpb(data.id_spb, t)
        t.commit()

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = { getPerjalanan, getPerjalananById, storePerjalanan, updatePerjalanan, deletePerjalanan }