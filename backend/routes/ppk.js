const express = require('express')
const router = express.Router()
const {
    getPpk,
    getPpkById,
    storePpk,
    updatePpk,
    deletePpk
} = require("../controller/ppkController")

router.get("/", getPpk)
router.get("/:id", getPpkById)
router.post("/store", storePpk)
router.patch("/update/:id", updatePpk)
router.delete("/delete/:id", deletePpk)

module.exports = router