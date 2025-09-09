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

const storeLogUser = async (username, aksi, jenis_data, data_diubah) => {
    try {
        let now = new Date()

        let date = now.getDate()
        let month = now.getMonth() + 1
        let year = now.getFullYear()
        date = (date < 10) ? '0' + String(date) : date
        month = (month < 10) ? '0' + String(month) : month
        const tanggal = `${year}-${month}-${date}`

        let hour = now.getHours()
        let minute = now.getMinutes()
        let second = now.getSeconds()
        hour = (hour < 10) ? '0' + String(hour) : hour
        minute = (minute < 10) ? '0' + String(minute) : minute
        second = (second < 10) ? '0' + String(second) : second
        const waktu = `${hour}:${minute}:${second}`

        let data = await logUser.create({ username, aksi, jenis_data, data_diubah, tanggal, waktu })

        return data
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = { getLogUser, getLogUserById, storeLogUser }