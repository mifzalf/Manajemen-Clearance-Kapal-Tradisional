const express = require('express')
const router = express.Router()
const {
    getLogUser,
    getLogUserById,
    storeLogUser,
    getLogUserByFilter
} = require("../controller/logUserController")

router.get("/", getLogUser)
router.get("/get-filter", getLogUserByFilter)
router.get("/:id", getLogUserById)
router.post("/store", storeLogUser)
// router.patch("/update/:id", updateLogUser)
// router.delete("/delete/:id", deleteLogUser)

module.exports = router