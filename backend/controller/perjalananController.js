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

const getPerjalananByFilter = async (req, res) => {
    let { nama_kapal, kategori, tanggal_awal, tanggal_akhir, nama_muatan } = req.query;

    try {
        let wherePerjalanan = {};
        let whereKapal = {};
        let whereKategoriMuatan = {};

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
            wherePerjalanan.tanggal_berangkat = {
                [Op.gte]: new Date(tanggal_awal)
            };
        } else if (tanggal_akhir) {
            wherePerjalanan.tanggal_berangkat = {
                [Op.lte]: new Date(tanggal_akhir)
            };
        }

        const datas = await perjalanan.findAll({
            where: wherePerjalanan,
            include: [
                {
                    model: kapal,
                    attributes: ['nama_kapal', 'gt', 'nt', 'nomor_selar', 'tanda_selar', 'nomor_imo', 'call_sign'],
                    include: [
                        { model: jenis, attributes: ['nama_jenis'] },
                        { model: negara, as: "bendera", attributes: ['kode_negara'] }
                    ],
                    where: whereKapal
                },
                { model: spb, attributes: ['no_spb', 'no_spb_asal'] },
                { model: nahkoda, attributes: ['nama_nahkoda'] },
                { model: agen, attributes: ['nama_agen'] },
                {
                    model: muatan,
                    attributes: ['jenis_perjalanan', 'satuan_muatan', 'jumlah_muatan'],
                    include: [
                        {
                            model: kategoriMuatan,
                            attributes: ['nama_kategori_muatan', 'status_kategori_muatan'],
                            where: whereKategoriMuatan,
                            required: Object.keys(whereKategoriMuatan).length > 0
                        }
                    ],
                    required: Object.keys(whereKategoriMuatan).length > 0
                },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ],
        });

        return res.status(200).json({ msg: "Berhasil mengambil data", datas });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

const getPerjalanan = async (req, res) => {
    let search = req.query.search || ""
    try {
        const datas = await perjalanan.findAll({
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
                    model: muatan, attributes: ['jenis_perjalanan', 'satuan_muatan', 'jumlah_muatan'], include: [
                        { model: kategoriMuatan, attributes: ['nama_kategori_muatan', 'status_kategori_muatan'] }
                    ]
                },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ],
            where: {
                [Op.or]: [
                    { '$kapal.nama_kapal$': { [Op.like]: `%${search}%` } },
                    { '$agen.nama_agen$': { [Op.like]: `%${search}%` } },
                    { '$muatans.kategori_muatan.status_kategori_muatan$': { [Op.like]: `%${search}%` } },
                    { '$tujuan_akhir.nama_kecamatan$': { [Op.like]: `%${search}%` } },
                ]
            }
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
                    model: muatan, attributes: ['jenis_perjalanan', 'satuan_muatan', 'jumlah_muatan'], include: [
                        { model: kategoriMuatan, attributes: ['nama_kategori_muatan', 'status_kategori_muatan'] }
                    ]
                },
                { model: kabupaten, as: "kedudukan_kapal", attributes: ['nama_kabupaten'] },
                { model: kecamatan, as: "datang_dari", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tempat_singgah", attributes: ['nama_kecamatan'] },
                { model: kecamatan, as: "tujuan_akhir", attributes: ['nama_kecamatan'] },
            ]
        })
        if (data == null) return res.status(500).json({ msg: "data tidak ditemukan" })

        return res.status(200).json({ msg: "Berhasil mengambil data", data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const storePerjalanan = async (req, res) => {
    const t = await db.transaction()
    try {
        let { muatan } = req.body
        console.log(req.body)
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
            req.body.id_tempat_singgah
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

        console.log(req.body)
        let no_urut
        let tanggalSekarang = new Date()
        let bulanSekarang = `0${tanggalSekarang.getMonth()}`
        let latestData = await perjalanan.findOne({
            order: [['createdAt', 'DESC']]
        })
        console.log(latestData)
        no_urut = bulanSekarang + "01"
        if (latestData) {
            let latestNumber = latestData.no_urut.substring(2)
            latestNumber = parseInt(latestNumber) + 1
            if (String(latestNumber).startsWith(0)) {
                latestNumber = parseInt(latestNumber.substring(1)) + 1
            }
            if (latestNumber < 10) latestNumber = "0" + String(latestNumber)
            no_urut = `${bulanSekarang}${latestNumber}`
        }

        req.body.status_muatan_berangkat = (String(req.body.status_muatan_berangkat).toLowerCase() == "kosong") ? "NIHIL" : "SESUAI MANIFEST"

        let spb = await spbController.storeSpb(req.body.no_spb_asal, t)

        let newPerjalanan = await perjalanan.create({ ...req.body, no_urut, id_spb: spb.id_spb }, { transaction: t })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: newPerjalanan.id_perjalanan }
        })
        console.log(filteredMuatan)
        if (muatan.length > 0) {
            await muatanController.storeMuatan(filteredMuatan, t)
        }

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
        let { muatan } = req.body
        let perjalananData = await perjalanan.findByPk(req.params.id)
        let kapalData = await kapal.findByPk(req.body.id_kapal)
        let nahkodaData = await nahkoda.findByPk(req.body.id_nahkoda)
        let kabupatenData = await kabupaten.findByPk(req.body.id_kedudukan_kapal)
        let agenData = await agen.findByPk(req.body.id_agen)
        let uniqueId = [
            req.body.id_datang_dari,
            req.body.id_tujuan_akhir,
            req.body.id_tempat_singgah
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

        req.body.status_muatan_berangkat = (String(req.body.status_muatan_berangkat).toLowerCase() == "kosong") ? "NIHIL" : "SESUAI MANIFEST"

        await spbController.updateSpb(req.body.no_spb_asal, perjalananData.id_spb, t)

        let result = await perjalanan.update({ ...req.body }, { where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })

        let filteredMuatan = muatan.map(m => {
            return { ...m, id_perjalanan: req.params.id }
        })
        console.log(filteredMuatan)
        if (data.status_muatan_berangkat)
            await muatanController.updateMuatan(filteredMuatan, req.params.id, t)

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
        let data = await perjalanan.findByPk(req.params.id)
        let result = await perjalanan.destroy({ where: { id_perjalanan: req.params.id }, transaction: t })

        if (result == 0) return res.status(500).json({ msg: "data tidak ditemukan" })
        await spbController.deleteSpb(data.id_spb, t)
        t.commit()

        return res.status(200).json({ msg: "Berhasil menghapus data" })
    } catch (error) {
        t.rollback()
        console.log(error)
        return res.status(500).json({ msg: "terjadi kesalahan pada fungsi" })
    }
}

const getTotalPerjalanan = async (req, res) => {
    try {
        const datas = await perjalanan.count()
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
        const datas = await perjalanan.findAll(
            {
                attributes: [
                    [col('muatans.kategori_muatan.status_kategori_muatan'), "status_kategori_muatan"],
                    [fn("COUNT", col("muatans.kategori_muatan.status_kategori_muatan")), 'jumlah_kategori_muatan'],
                ],
                where: literal(`MONTH(tanggal_clearance) = ${currentMonth}`),
                group: [col('muatans.kategori_muatan.status_kategori_muatan')],
                include: [{
                    model: muatan,
                    attributes: [],
                    include: [{
                        model: kategoriMuatan,
                        attributes: []
                    }]
                }]
            }
        )

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

        datas.forEach(d => {
            if(d.dataValues.status_kategori_muatan.toLowerCase() == "berbahaya"){
                console.log("hai")
                defaultDatas[1].jumlah_kategori_muatan = d.dataValues.jumlah_kategori_muatan
            }else{
                defaultDatas[0].jumlah_kategori_muatan = d.dataValues.jumlah_kategori_muatan
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
    getTotalPerjalanan, 
    getTotalPerjalananPerMonth, 
    getTotalPerKategori
}