const kecamatan = require("../model/kecamatanModel")
const kapal = require("../model/kapalModel")
const nahkoda = require("../model/nahkodaModel")
const perjalanan = require("../model/perjalananModel")
const kabupaten = require("../model/kabupatenModel")
const { Op, Sequelize, literal, col, fn } = require("sequelize")
const agen = require("../model/agenModel")
let spbController = require("./spbController")
let muatanController = require("./muatanController")
const { db } = require("../config/db")
const spb = require("../model/spbModel")
const negara = require("../model/negaraModel")
const jenis = require("../model/jenisModel")
const muatan = require("../model/muatanModel")
const kategoriMuatan = require("../model/kategoriMuatanModel")
const muatanKendaraan = require("../model/muatanKendaraanModel");
const logUserController = require("./logUserController")
const users = require("../model/userModel")
const pelabuhan = require("../model/pelabuhanModel")

const getPerjalananByFilter = async (req, res) => {
    let { nama_kapal, kategori, tanggal_awal, tanggal_akhir, nama_muatan, limit, page, wilker } = req.query;

    try {
        const dataUser = await users.findByPk(req.user.id);
        let dataWilker = dataUser.wilayah_kerja;
        if (wilker.toLowerCase() != dataWilker.toLowerCase() && dataWilker.toLowerCase() != "pusat")
            return res.status(500).json({ msg: "Tidak ada akses" });

        let wherePerjalanan = {};
        let whereKapal = {};
        let whereKategoriMuatan = {};
        let pagination = {};

        if (limit) pagination.limit = Number(limit);
        if (page) pagination.offset = (limit * page) - limit;

        if (nama_kapal) {
            whereKapal.nama_kapal = { [Op.like]: `%${nama_kapal}%` };
        }

        if (kategori) {
            whereKategoriMuatan.status_kategori_muatan = { [Op.like]: `%${kategori}%` };
        }

        if (nama_muatan) {
            whereKategoriMuatan.nama_kategori_muatan = { [Op.like]: `%${nama_muatan}%` };
        }

        if (tanggal_awal && tanggal_akhir) {
            wherePerjalanan.tanggal_berangkat = {
                [Op.between]: [new Date(tanggal_awal), new Date(tanggal_akhir)]
            };
        } else if (tanggal_awal) {
            wherePerjalanan.tanggal_berangkat = { [Op.gte]: new Date(tanggal_awal) };
        } else if (tanggal_akhir) {
            wherePerjalanan.tanggal_berangkat = { [Op.lte]: new Date(tanggal_akhir) };
        }

        let perjalananIds = null;
        if (nama_muatan || kategori) {
            perjalananIds = await muatan.findAll({
                attributes: ["id_perjalanan"],
                include: [
                    {
                        model: kategoriMuatan,
                        as: "kategori_muatan",
                        required: true,
                        where: whereKategoriMuatan
                    }
                ],
                raw: true
            }).then(rows => rows.map(r => r.id_perjalanan));

            if (perjalananIds.length === 0) {
                return res.status(200).json({ msg: "Tidak ada data", datas: [] });
            }
        }

        const datas = await perjalanan.findAll({
            where: {
                ...wherePerjalanan,
                ...(perjalananIds ? { id_perjalanan: { [Op.in]: perjalananIds } } : {}),
            },
            include: [
                {
                    model: kapal,
                    attributes: ['nama_kapal', 'gt', 'nt', 'nomor_selar', 'tanda_selar', 'nomor_imo', 'call_sign'],
                    include: [
                        { model: jenis, attributes: ['nama_jenis'] },
                        { model: negara, as: "bendera", attributes: ['kode_negara'] }
                    ],
                    required: true,
                    where: whereKapal
                },
                { model: spb, attributes: ['no_spb', 'no_spb_asal'] },
                { model: nahkoda, attributes: ['nama_nahkoda'] },
                { model: agen, attributes: ['nama_agen'] },
                {
                    model: muatan,
                    as: "muatans",
                    separate: true,
                    attributes: ["jenis_perjalanan", "satuan_muatan", "jumlah_muatan"],
                    include: [
                        {
                            model: kategoriMuatan,
                            as: "kategori_muatan",
                            attributes: ["nama_kategori_muatan", "status_kategori_muatan"],
                            where: (nama_muatan || kategori) ? whereKategoriMuatan : undefined
                        }
                    ]
                },
                {
                    model: muatanKendaraan, as: "muatan_kendaraan", separate: true, attributes: ['jenis_perjalanan', 'golongan_kendaraan', 'jumlah_kendaraan']
                },
                { model: pelabuhan, as: "tolak", attributes: ['nama_pelabuhan'] },
                { model: pelabuhan, as: "sandar", attributes: ['nama_pelabuhan'] },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ],
            ...pagination
        });

        return res.status(200).json({ msg: "Berhasil mengambil data", datas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

const getPerjalanan = async (req, res) => {
    let search = req.query.search || ""
    let { limit, page } = req.query

    try {
        const dataUser = await users.findByPk(req.user.id)
        let wilker = dataUser.wilayah_kerja

        console.log(wilker)
        let whereClause
        if (wilker.toLowerCase() != "pusat") {
            whereClause = {
                wilayah_kerja: "dungkek",
                [Op.or]: [
                    { '$kapal.nama_kapal$': { [Op.like]: `%${search}%` } },
                    { '$nahkoda.nama_nahkoda$': { [Op.like]: `%${search}%` } },
                    { '$agen.nama_agen$': { [Op.like]: `%${search}%` } },
                    { '$tujuan_akhir.nama_kecamatan$': { [Op.like]: `%${search}%` } },
                ]
            }
        } else {
            whereClause = {
                [Op.or]: [
                    { '$kapal.nama_kapal$': { [Op.like]: `%${search}%` } },
                    { '$nahkoda.nama_nahkoda$': { [Op.like]: `%${search}%` } },
                    { '$agen.nama_agen$': { [Op.like]: `%${search}%` } },
                    { '$tujuan_akhir.nama_kecamatan$': { [Op.like]: `%${search}%` } },
                ]
            }
        }

        console.log(whereClause)

        let pagination = {}

        if (limit) {
            pagination.limit = Number(limit)
        }

        if (page) {
            pagination.offset = (limit * page) - limit
        }

        const datas = await perjalanan.findAll({
            subQuery: false,
            include: [
                {
                    model: kapal, attributes: ['nama_kapal', 'gt', 'nt', 'nomor_selar', 'tanda_selar', 'nomor_imo', 'call_sign'], include: [
                        { model: jenis, attributes: ['nama_jenis'] },
                        { model: negara, as: "bendera", attributes: ['kode_negara'] }
                    ]
                },
                { model: spb, attributes: ['no_spb', 'no_spb_asal'] },
                { model: nahkoda, attributes: ['nama_nahkoda'] },
                { model: agen, attributes: ['nama_agen'] },
                {
                    model: muatan, as: "muatans", separate: true, attributes: ['jenis_perjalanan', 'satuan_muatan', 'jumlah_muatan'], include: [
                        {
                            model: kategoriMuatan, as: "kategori_muatan", attributes: ['nama_kategori_muatan', 'status_kategori_muatan'], where: {
                                status_kategori_muatan: { [Op.like]: `%${search}%` }
                            }
                        }
                    ]
                },
                {
                    model: muatanKendaraan, as: "muatan_kendaraan", separate: true, attributes: ['jenis_perjalanan', 'golongan_kendaraan', 'jumlah_kendaraan'],
                    where: {
                        golongan_kendaraan: { [Op.like]: `%${search}%` }
                    }
                },
                { model: pelabuhan, as: "tolak", attributes: ['nama_pelabuhan'] },
                { model: pelabuhan, as: "sandar", attributes: ['nama_pelabuhan'] },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ],
            where: whereClause,
            ...pagination
        })
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getPerjalananById = async (req, res) => {
    let search = req.query.search
    try {
        const dataUser = await users.findByPk(req.user.id)
        let wilker = dataUser.wilayah_kerja

        let id = req.params.id
        let data = await perjalanan.findByPk(id, {
            include: [
                {
                    model: kapal, attributes: ['nama_kapal', 'gt', 'nt', 'nomor_selar', 'tanda_selar', 'nomor_imo', 'call_sign'], include: [
                        { model: jenis, attributes: ['nama_jenis'] },
                        { model: negara, as: "bendera", attributes: ['kode_negara'] }
                    ]
                },
                { model: spb, attributes: ['no_spb', 'no_spb_asal'] },
                { model: nahkoda, attributes: ['nama_nahkoda'] },
                { model: agen, attributes: ['nama_agen'] },
                {
                    model: muatan, as: "muatans", attributes: ['id_kategori_muatan', 'jenis_perjalanan', 'satuan_muatan', 'jumlah_muatan'], include: [
                        { model: kategoriMuatan, as: "kategori_muatan", attributes: ['nama_kategori_muatan', 'status_kategori_muatan'] }
                    ]
                },
                {
                    model: muatanKendaraan, as: "muatan_kendaraan", separate: true, attributes: ['jenis_perjalanan', 'golongan_kendaraan', 'jumlah_kendaraan'],
                },
                { model: pelabuhan, as: "tolak", attributes: ['nama_pelabuhan'] },
                { model: pelabuhan, as: "sandar", attributes: ['nama_pelabuhan'] },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ]
        })
        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })
        if (data.wilayah_kerja.toLowerCase() != wilker.toLowerCase() && wilker.toLowerCase() != "pusat") return res.status(500).json({ msg: "tidak ada akses" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let { muatan, muatan_kendaraan } = req.body
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let userData = await users.findByPk(req.user.id)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
        ]
        let kecamatanId = [...new Set(uniqueId)]
        let kecamatanData = await kecamatan.findAll({
            where: {
                id_kecamatan: {
                    [Op.or]: kecamatanId
                }
            }
        })

        if (!kapalData ||
            !nahkodaData ||
            !kabupatenData ||
            kecamatanData.length < kecamatanId.length ||
            !agenData) return res.status(500).json({ msg: "data kapal / nahkoda / daerah / agen tidak ditemukan" })

        let spb = await spbController.storeSpb(req.body.spb.no_spb_asal, req.body.spb.no_spb, t)

        let newPerjalanan = await perjalanan.create({ ...req.body, wilayah_kerja: userData.wilayah_kerja, id_spb: spb.id_spb, id_user: req.user.id }, { transaction: t })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: newPerjalanan.id_perjalanan }
        })

        if (muatan.length > 0) {
            await muatanController.storeMuatan(filteredMuatan, t)
        }

        let filteredMuatanKendaraan = muatan_kendaraan.map(m => {
            return { ...m, id_perjalanan: newPerjalanan.id_perjalanan }
        })

        console.log(filteredMuatanKendaraan)

        await muatanKendaraan.bulkCreate(filteredMuatanKendaraan, { transaction: t });

        let log = await logUserController.storeLogUser(
            req.user.username,
            "CREATE",
            "perjalanan",
            `Menambah data perjalanan ${spb.no_spb}`
        )

        t.commit()
        return res.status(200).json({ msg: "Berhasil menambahkan data" })
    } catch (error) {
        t.rollback
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const updatePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let { muatan, muatan_kendaraan } = req.body
        let perjalananData = await perjalanan.findByPk(req.params.id, {
            include: {
                model: spb,
            }
        })
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let userData = await users.findByPk(req.user.id)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
        ]
        let kecamatanId = [...new Set(uniqueId)]
        let kecamatanData = await kecamatan.findAll({
            where: {
                id_kecamatan: {
                    [Op.or]: kecamatanId
                }
            }
        })

        if (!kapalData ||
            !nahkodaData ||
            !kabupatenData ||
            kecamatanData.length < kecamatanId.length ||
            !agenData) return res.status(500).json({ msg: "data kapal / nahkoda / daerah / agen tidak ditemukan" })

        await spbController.updateSpb(req.body.spb.no_spb_asal, req.body.spb.no_spb, perjalananData.id_spb, t)

        let result = await perjalanan.update({ ...req.body, wilayah_kerja: userData.wilayah_kerja }, { where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: req.params.id }
        })
        await muatanController.updateMuatan(filteredMuatan, req.params.id, t)

        await muatanKendaraan.destroy({ where: { id_perjalanan: req.params.id } })
        if (muatan_kendaraan.length > 0) {
            let filteredMuatanKendaraan = muatan_kendaraan.map(m => {
                return { ...m, id_perjalanan: req.params.id }
            })
            console.log(filteredMuatanKendaraan)
            await muatanKendaraan.bulkCreate(filteredMuatanKendaraan, { transaction: t });
        }


        let log = await logUserController.storeLogUser(
            req.user.username,
            "UPDATE",
            "perjalanan",
            `Mengubah data perjalanan ${perjalananData.spb.no_spb}`
        )

        t.commit()
        return res.status(200).json({ msg: "Berhasil memperbarui data" })
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const deletePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let perjalananData = await perjalanan.findOne({
            where: { id_perjalanan: req.params.id },
            include: {
                model: spb
            }
        })

        let perjalananDate = new Date(perjalananData.createdAt)
        let now = new Date()

        let dateDifference = Math.floor((now - perjalananDate) / (1000 * 60 * 60 * 24))

        if (dateDifference > 10) return res.status(500).json({ msg: "data tidak bisa dihapus" })

        let result = await perjalanan.destroy({ where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })
        await spbController.deleteSpb(perjalananData.id_spb, t)

        let log = await logUserController.storeLogUser(
            req.user.username,
            "DELETE",
            "perjalanan",
            `Menghapus data perjalanan ${perjalananData.spb.no_spb}`
        )

        t.commit()

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalPerjalananThisMonth = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth() + 1
        const currentYear = new Date().getFullYear()
        const datas = await perjalanan.count({
            where: {
                [Op.and]: [
                    literal(`YEAR(tanggal_clearance) = ${currentYear}`),
                    literal(`MONTH(tanggal_clearance) = ${currentMonth}`),
                ]
            }
        })
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalPerjalananNow = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0]
        const datas = await perjalanan.count({
            where: {
                tanggal_clearance: today
            }
        })
        return res.status(200).json({ msg: "Berhasil mengambil data", datas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalPerjalananPerMonth = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear()
        const datas = await perjalanan.findAll(
            {
                attributes: [
                    [fn("MONTH", col("tanggal_clearance")), 'bulan'],
                    [fn("COUNT", col("id_perjalanan")), 'jumlah_perjalanan'],
                ],
                where: literal(`YEAR(tanggal_clearance) = ${currentYear}`),
                group: [fn('MONTH', col("tanggal_clearance"))],
                order: [[fn('MONTH', col("tanggal_clearance")), 'ASC']]
            }
        )

        let defaultData = new Array(12)
        for (let i = 0; i < 12; i++) {
            defaultData[i] = {
                bulan: i + 1,
                jumlah_perjalanan: 0
            }
        }

        datas.forEach(d => {
            defaultData[d.dataValues.bulan - 1].jumlah_perjalanan = d.dataValues.jumlah_perjalanan
        })

        return res.status(200).json({ msg: "Berhasil mengambil data", defaultData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalPerKategori = async (req, res) => {
    try {
        const currentMonth = new Date().getMonth() + 1
        const datas = await await perjalanan.findAll({
            attributes: [
                [col('muatans.kategori_muatan.status_kategori_muatan'), "status_kategori_muatan"],
                [fn("COUNT", col("muatans.kategori_muatan.status_kategori_muatan")), 'jumlah_kategori_muatan'],
            ],
            where: literal(`MONTH(perjalanan.tanggal_clearance) = ${currentMonth}`),
            include: [{
                as: "muatans",
                model: muatan,
                required: true,
                attributes: [],
                include: [{
                    as: "kategori_muatan",
                    model: kategoriMuatan,
                    required: true,
                    attributes: []
                }]
            }],
            group: [col('muatans.kategori_muatan.status_kategori_muatan')],
            raw: true
        });

        const defaultDatas = [
            {
                status_kategori_muatan: "Umum",
                jumlah_kategori_muatan: 0
            },
            {
                status_kategori_muatan: "Berbahaya",
                jumlah_kategori_muatan: 0
            },
        ]

        console.log(datas)

        datas.forEach(d => {
            if (d.status_kategori_muatan.toLowerCase() == "berbahaya") {
                console.log("hai")
                defaultDatas[1].jumlah_kategori_muatan = d.jumlah_kategori_muatan
            } else {
                defaultDatas[0].jumlah_kategori_muatan = d.jumlah_kategori_muatan
            }
        })

        return res.status(200).json({ msg: "Berhasil mengambil data", defaultDatas })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

module.exports = {
    getPerjalananByFilter,
    getPerjalanan,
    getPerjalananById,
    storePerjalanan,
    updatePerjalanan,
    deletePerjalanan,
    getTotalPerjalananThisMonth,
    getTotalPerjalananPerMonth,
    getTotalPerKategori,
    getTotalPerjalananNow
}