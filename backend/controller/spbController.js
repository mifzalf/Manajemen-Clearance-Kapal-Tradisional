const spb = require("../model/spbModel")

const getSpb = async (req, res) => {
    try {
        const datas = await spb.findAll()
        return res.status(200).json({msg: "Berhasil mengambil data", datas})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getSpbById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await spb.findByPk(id)
        
        if(data == null) return res.status(500).json({msg: "data tidak ditemukan"})
            
        return res.status(200).json({msg: "Berhasil mengambil data", data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeSpb = async (req, res) => {
    try {
        if(req.body.no_spb_asal == "") req.body.no_spb_asal = null
        await spb.create({...req.body})

        return res.status(200).json({msg: "Berhasil menambahkan data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateSpb = async (req, res) => {
    try {
        if(req.body.no_spb_asal == "") req.body.no_spb_asal = null
        let result = await spb.update({...req.body}, {where: {id_spb: req.params.id}})

        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil memperbarui data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteSpb = async (req, res) => {
    try {
        let result = await spb.destroy({where: {id_spb: req.params.id}})
        
        if (result == 0) return res.status(500).json({msg: "data tidak ditemukan"})

        return res.status(200).json({msg: "Berhasil menghapus data"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {getSpb, getSpbById, storeSpb, updateSpb, deleteSpb}