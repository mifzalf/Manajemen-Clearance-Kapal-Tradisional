const users = require("../model/userModel")

const adminAuth = async (req, res, next) => {
    try {
        let id = req.user.id
        let data = await users.findOne({ where: { id_user: id, role: "superuser" } })

        if (!data) return res.status(401).json({ msg: "Anda tidak memiliki akses" })

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada middleware" })
    }
}

const userAuth = async (req, res, next) => {
    try {
        let id = req.params.id
        let data = await users.findOne({ where: { id_user: req.user.id } })

        if(data.id_user != id && data.role != 'superuser') return res.status(401).json({ msg: "Anda tidak memiliki akses" })

        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada middleware" })
    }
}

module.exports = {adminAuth, userAuth}