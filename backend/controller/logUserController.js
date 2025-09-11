const logUser = require("../model/logUserModel")
const { Op } = require("sequelize")

const getLogUser = async (req, res) => {
    let { search, limit, page } = req.query
    let pagination = {}

    if (limit) {
        pagination.limit = Number(limit)
    }

    if (page) {
        pagination.offset = (limit * page) - limit
    }
    
    try {
        const datas = await logUser.findAll({
            where: {
                [Op.or]: [
                    { '$username$': { [Op.like]: `%${search || ""}%` } },
                    { '$waktu$': { [Op.like]: `%${search || ""}%` } },
                    { '$tanggal$': { [Op.like]: `%${search || ""}%` } },
                    { '$aksi$': { [Op.like]: `%${search || ""}%` } },
                    { '$jenis_data$': { [Op.like]: `%${search || ""}%` } },
                    { '$data_diubah$': { [Op.like]: `%${search || ""}%` } },
                ]
            },
            ...pagination
        })
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getLogUserByFilter = async (req, res) => {
    let { aksi, jenis_data, tanggal_awal, tanggal_akhir, username, limit, page } = req.query

    try {
        let whereLogUser = {};
        let pagination = {}

        if (limit) {
            pagination.limit = Number(limit)
        }

        if (page) {
            pagination.offset = (limit * page) - limit
        }

        if (aksi) {
            whereLogUser.aksi = { [Op.like]: `%${aksi}%` };
        }

        if (jenis_data) {
            whereLogUser.jenis_data = { [Op.like]: `%${jenis_data}%` };
        }

        if (username) {
            whereLogUser.username = { [Op.like]: `%${username}%` };
        }

        if (tanggal_awal && tanggal_akhir) {
            whereLogUser.tanggal = {
                [Op.between]: [new Date(tanggal_awal), new Date(tanggal_akhir)]
            };
        } else if (tanggal_awal) {
            whereLogUser.tanggal = {
                [Op.gte]: new Date(tanggal_awal)
            };
        } else if (tanggal_akhir) {
            whereLogUser.tanggal = {
                [Op.lte]: new Date(tanggal_akhir)
            };
        }

        const datas = await logUser.findAll({
            where: whereLogUser,
            ...pagination
        })

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

module.exports = { getLogUser, getLogUserById, getLogUserByFilter, storeLogUser }