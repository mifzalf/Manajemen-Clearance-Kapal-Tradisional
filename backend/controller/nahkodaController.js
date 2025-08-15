const nahkoda = require("../model/nahkodaModel")

const getNahkoda = async (req, res) => {
    try {
        const datas = await nahkoda.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getNahkodaById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await nahkoda.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeNahkoda = async (req, res) => {
    try {
        await nahkoda.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateNahkoda = async (req, res) => {
    try {
        let result = await nahkoda.update({...req.body}, {where: {id_nahkoda: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteNahkoda = async (req, res) => {
    try {
        let result = await nahkoda.destroy({where: {id_nahkoda: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getNahkoda, getNahkodaById, storeNahkoda, updateNahkoda, deleteNahkoda}