const path = require("path")
const fs = require("fs")
const jwt = require("jsonwebtoken")
const perjalanan = require("../model/perjalananModel")
const users = require("../model/userModel")

const login = async (req, res) => {
    try {
        let {username, password} = req.body
        console.log(req.body)
        const data = await users.findOne({where: { username, password }})
        if(!data) return res.status(401).json({msg: "Username / password tidak sesuai"})
        
        const token = jwt.sign({
            id: data.id_user,
            username: data.username
        }, process.env.JWT_SECRET, {expiresIn: "1h"})

        return res.status(200).json({msg: "Berhasil login", token})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getUser = async (req, res) => {
    try {
        const datas = await users.findAll({
            attributes: {
                exclude: ['password']
            }
        })
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getUserById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await users.findByPk(id, {
            attributes: {
                exclude: ['password']
            }
        })

        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeUser = async (req, res) => {
    try {
        let data = await users.findOne({where: {username: req.body.username}})
        if(data) return res.status(500).json({ msg: "Username sudah ada" })

        if (req.file) {
            req.body.foto = `images/profil/${req.file.filename}`
        }
        await users.create({ ...req.body })

        return res.status(200).json({ msg: "Berhasil menambahkan data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updateUser = async (req, res, next) => {
    try {
        let data = await users.findOne({where: {username: req.body.username}})
        if(data && data.id_user != req.params.id) return res.status(500).json({ msg: "Username sudah ada" })

        if (req.file) {
            let data = await users.findByPk(req.params.id)
            if (data.foto) {
                let oldFile = path.join(__dirname, "../public", data.foto)
                console.log(oldFile)
                fs.unlinkSync(oldFile)
            }
            req.body.foto = `images/profil/${req.file.filename}`
        }
        let result = await users.update({ ...req.body }, { where: { id_user: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil memperbarui data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deleteUser = async (req, res) => {
    try {
        let data = await users.findByPk(req.params.id)
        if (data.foto) {
            let file = path.join(__dirname, "../public", data.foto)
            console.log(file)
            fs.unlinkSync(file)
        }
        let result = await users.destroy({ where: { id_user: req.params.id } })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = { login, getUser, getUserById, storeUser, updateUser, deleteUser }