const express = require('express')
const router = express.Router()
const {
    getKapal,
    getKapalById,
    storeKapal,
    updateKapal,
    deleteKapal,
    getTotalKapal,
    getTotalKapalNow
} = require("../controller/kapalController")

router.get("/", getKapal)
router.get("/total", getTotalKapal)
router.get("/total-today", getTotalKapalNow)
router.get("/:id", getKapalById)
router.post("/store", storeKapal)
router.patch("/update/:id", updateKapal)
router.delete("/delete/:id", deleteKapal)

module.exports = router