const express = require('express')
const router = express.Router()
const {
    getKapal,
    getKapalById,
    storeKapal,
    updateKapal,
    deleteKapal
} = require("../controller/kapalController")

router.get("/", getKapal)
router.get("/:id", getKapalById)
router.post("/store", storeKapal)
router.patch("/update/:id", updateKapal)
router.delete("/delete/:id", deleteKapal)

module.exports = router