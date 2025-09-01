const express = require('express')
const router = express.Router()
const {
    getPerjalanan,
    getPerjalananById,
    storePerjalanan,
    updatePerjalanan,
    deletePerjalanan,
    getPerjalananByFilter,
    getTotalPerjalanan,
    getTotalPerjalananPerMonth,
    getTotalPerKategori
} = require("../controller/perjalananController")

router.get("/get-filter", getPerjalananByFilter)
router.get("/total", getTotalPerjalanan)
router.get("/total-kategori", getTotalPerKategori)
router.get("/total-month", getTotalPerjalananPerMonth)
router.get("/", getPerjalanan)
router.get("/:id", getPerjalananById)
router.post("/store", storePerjalanan)
router.patch("/update/:id", updatePerjalanan)
router.delete("/delete/:id", deletePerjalanan)

module.exports = router