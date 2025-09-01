const { Op } = require("sequelize")
const jenis = require("../model/jenisModel")
const kapal = require("../model/kapalModel")
const negara = require("../model/negaraModel")

const getKapal = async (req, res) => {
    try {
        const datas = await kapal.findAll()
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getKapalById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await kapal.findByPk(id)
        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeKapal = async (req, res) => {
    try {
        let jenisData = await jenis.findByPk(req.body.id_jenis)
        let benderaData = await negara.findByPk(req.body.id_bendera)
        if (!jenisData || !benderaData) return res.status(500).json({ msg: "data jenis / bendera tidak ditemukan" })

        await kapal.create({ ...req.body })

        return res.status(200).json({ msg: "Berhasil menambahkan data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateKapal = async (req, res) => {
    try {
        let jenisData = await jenis.findByPk(req.body.id_jenis)
        let benderaData = await negara.findByPk(req.body.id_bendera)
        if (!jenisData || !benderaData) return res.status(500).json({ msg: "data jenis / bendera tidak ditemukan" })

        let result = await kapal.update({ ...req.body }, { where: { id_kapal: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil memperbarui data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteKapal = async (req, res) => {
    try {
        let result = await kapal.destroy({ where: { id_kapal: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalKapal = async (req, res) => {
    try {
        const datas = await kapal.count()
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalKapalNow = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0]; // "2025-09-01"

        const startOfDay = new Date(today + "T00:00:00.000Z");
        const endOfDay = new Date(today + "T23:59:59.999Z");

        const datas = await kapal.count({
            where: {
                createdAt: {
                    [Op.between]: [startOfDay, endOfDay]
                }
            }
        });

        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = { getKapal, getKapalById, storeKapal, updateKapal, deleteKapal, getTotalKapal, getTotalKapalNow }