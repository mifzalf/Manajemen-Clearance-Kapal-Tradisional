const kabupaten = require("../model/kabupatenModel")
const kecamatan = require("../model/kecamatanModel")

const getKecamatan = async (req, res) => {
    try {
        const datas = await kecamatan.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getKecamatanById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await kecamatan.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeKecamatan = async (req, res) => {
    try {
        let data = await kabupaten.findByPk(req.body.id_kabupaten)
        if(!data) return res.status(500).json({msg: "data kabupaten tidak ditemukan"})
            
        await kecamatan.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateKecamatan = async (req, res) => {
    try {
        let result = await kecamatan.update({...req.body}, {where: {id_kecamatan: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteKecamatan = async (req, res) => {
    try {
        let result = await kecamatan.destroy({where: {id_kecamatan: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getKecamatan, getKecamatanById, storeKecamatan, updateKecamatan, deleteKecamatan}