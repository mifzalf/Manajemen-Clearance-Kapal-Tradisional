const ppk = require("../model/ppkModel")

const getPpk = async (req, res) => {
    try {
        const datas = await ppk.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getPpkById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await ppk.findByPk(id)
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storePpk = async (req, res) => {
    try {
        await ppk.create({...req.body})
        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updatePpk = async (req, res) => {
    try {
        await ppk.update({...req.body}, {where: {id_ppk: req.params.id}})
        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deletePpk = async (req, res) => {
    try {
        await ppk.destroy({where: {id_ppk: req.params.id}})
        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getPpk, getPpkById, storePpk, updatePpk, deletePpk}