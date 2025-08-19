const jenis = require("../model/jenisModel")

const getJenis = async (req, res) => {
    try {
        const datas = await jenis.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getJenisById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await jenis.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeJenis = async (req, res) => {
    try {
        await jenis.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateJenis = async (req, res) => {
    try {
        let result = await jenis.update({...req.body}, {where: {id_jenis: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteJenis = async (req, res) => {
    try {
        let result = await jenis.destroy({where: {id_jenis: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getJenis, getJenisById, storeJenis, updateJenis, deleteJenis}