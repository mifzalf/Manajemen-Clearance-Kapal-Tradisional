const express = require('express')
const router = express.Router()
const {
    getKategoriMuatan,
    getKategoriMuatanById,
    storeKategoriMuatan,
    updateKategoriMuatan,
    deleteKategoriMuatan
} = require("../controller/kategoriMuatanController")

router.get("/", getKategoriMuatan)
router.get("/:id", getKategoriMuatanById)
router.post("/store", storeKategoriMuatan)
router.patch("/update/:id", updateKategoriMuatan)
router.delete("/delete/:id", deleteKategoriMuatan)

module.exports = router