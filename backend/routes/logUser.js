const express = require('express')
const router = express.Router()
const {
    getLogUser,
    getLogUserById,
    storeLogUser,
    updateLogUser,
    deleteLogUser
} = require("../controller/logUserController")

router.get("/", getLogUser)
router.get("/:id", getLogUserById)
router.post("/store", storeLogUser)
// router.patch("/update/:id", updateLogUser)
// router.delete("/delete/:id", deleteLogUser)

module.exports = router