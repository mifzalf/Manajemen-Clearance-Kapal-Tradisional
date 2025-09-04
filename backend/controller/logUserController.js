const perjalanan = require("../model/perjalananModel")
const logUser = require("../model/logUserModel")

const getLogUser = async (req, res) => {
    try {
        const datas = await logUser.findAll()
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getLogUserById = async (req, res) => {
    try {
        let id = req.params.id
        let data = await logUser.findByPk(id)

        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storeLogUser = async (no_logUser_asal, t) => {
    try {
        if (no_logUser_asal == "") no_logUser_asal = null
        let latestData = await logUser.findOne({ order: [["createdAt", "DESC"]] })
        no_logUser = "0000001"
        if (latestData) {
            let num = String(parseInt(latestData.no_logUser) + 1)
            no_logUser = num.padStart(latestData.no_logUser.length, "0")
        }
        let newlogUser = await logUser.create({ no_logUser_asal, no_logUser }, {transaction: t})

        return newlogUser
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = { getLogUser, getLogUserById, storeLogUser, updateLogUser, deleteLogUser }