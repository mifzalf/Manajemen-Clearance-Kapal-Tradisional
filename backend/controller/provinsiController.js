const negara = require("../model/negaraModel")
const provinsi = require("../model/provinsiModel")

const getProvinsi = async (req, res) => {
    try {
        const datas = await provinsi.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getProvinsiById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await provinsi.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeProvinsi = async (req, res) => {
    try {
        let data = await negara.findByPk(req.body.id_negara)
        if(!data) return res.status(500).json({msg: "data negara tidak ditemukan"})
            
        await provinsi.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateProvinsi = async (req, res) => {
    try {
        let result = await provinsi.update({...req.body}, {where: {id_provinsi: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteProvinsi = async (req, res) => {
    try {
        let result = await provinsi.destroy({where: {id_provinsi: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getProvinsi, getProvinsiById, storeProvinsi, updateProvinsi, deleteProvinsi}