const negara = require("../model/negaraModel")

const getNegara = async (req, res) => {
    try {
        const datas = await negara.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getNegaraById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await negara.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeNegara = async (req, res) => {
    try {
        await negara.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateNegara = async (req, res) => {
    try {
        let result = await negara.update({...req.body}, {where: {id_negara: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteNegara = async (req, res) => {
    try {
        let result = await negara.destroy({where: {id_negara: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getNegara, getNegaraById, storeNegara, updateNegara, deleteNegara}