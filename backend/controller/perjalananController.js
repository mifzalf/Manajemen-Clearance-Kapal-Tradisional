const kecamatan = require("../model/kecamatanModel")
const kapal = require("../model/kapalModel")
const nahkoda = require("../model/nahkodaModel")
const perjalanan = require("../model/perjalananModel")
const kabupaten = require("../model/kabupatenModel")
const { Op } = require("sequelize")
const agen = require("../model/agenModel")

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
    try {
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


        await perjalanan.create({ ...req.body, no_urut })

        return res.status(200).json({ msg: "Berhasil menambahkan data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updatePerjalanan = async (req, res) => {
    try {
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

        let result = await perjalanan.update({ ...req.body }, { where: { id_perjalanan: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil memperbarui data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deletePerjalanan = async (req, res) => {
    try {
        let result = await perjalanan.destroy({ where: { id_perjalanan: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = { getPerjalanan, getPerjalananById, storePerjalanan, updatePerjalanan, deletePerjalanan }