const kategoriMuatan = require("../model/kategoriMuatanModel")
const logUserController = require("./logUserController")

const getKategoriMuatan = async (req, res) => {
    try {
        const datas = await kategoriMuatan.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getKategoriMuatanById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await kategoriMuatan.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeKategoriMuatan = async (req, res) => {
    try {
        await kategoriMuatan.create({...req.body})

        let log = await logUserController.storeLogUser(
            req.user.username,
            "CREATE",
            "kategori",
            `Menambah data kategori ${req.body.nama_kategori}`
        )

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateKategoriMuatan = async (req, res) => {
    try {
        let kategoriData = await kategoriMuatan.findOne({
            where: { id_kategori: req.params.id },
            attributes: ['nama_kategori_muatan']
        })
        let result = await kategoriMuatan.update({...req.body}, {where: {id_kategori_muatan: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        let log = await logUserController.storeLogUser(
            req.user.username,
            "UPDATE",
            "kategori",
            `Mengubah data kategori ${(kategoriData.nama_kategori == req.body.nama_kategori) ?
                kategoriData.nama_kategori : kategoriData.nama_kategori + "->" + req.body.nama_kategori}`
        )

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteKategoriMuatan = async (req, res) => {
    try {
        let kategoriData = await kategoriMuatan.findOne({
            where: { id_kategori: req.params.id },
            attributes: ['nama_kategori_muatan']
        })
        let result = await kategoriMuatan.destroy({where: {id_kategori_muatan: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        let log = await logUserController.storeLogUser(
            req.user.username,
            "DELETE",
            "kategori",
            `Menghapus data kategori ${kategoriData.nama_kategori}`
        )

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getKategoriMuatan, getKategoriMuatanById, storeKategoriMuatan, updateKategoriMuatan, deleteKategoriMuatan}