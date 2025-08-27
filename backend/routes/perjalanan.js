const express = require('express')
const router = express.Router()
const {
    getPerjalanan,
    getPerjalananById,
    storePerjalanan,
    updatePerjalanan,
    deletePerjalanan
} = require("../controller/perjalananController")

router.get("/", getPerjalanan)
router.get("/:id", getPerjalananById)
router.post("/store", storePerjalanan)
router.patch("/update/:id", updatePerjalanan)
router.delete("/delete/:id", deletePerjalanan)

module.exports = router