var express = require('express');
var router = express.Router();
const path = require("path")
const multer = require("multer");
const { storeUser, getUser, updateUser, getUserById, deleteUser } = require('../controller/userController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/profil')
  },
  filename: (req, file, cb) => {
    let name = file.originalname.replace(/ /g, '+')
    let random = Math.floor(Math.random() * 9000) + 1000
    cb(null, `${random}${name}`)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.png', '.jpg', '.jpeg']
  const ext = path.extname(file.originalname)

  if(!allowedTypes.includes(ext)) return cb(new Error("Format file tidak sesuai"))
    cb(null, true)
}

const upload = multer({storage, fileFilter})

/* GET users listing. */
router.get('/', getUser);
router.get('/:id', getUserById);
router.post('/store', upload.single("foto"), storeUser)
router.patch('/update/:id', upload.single("foto"), updateUser)
router.delete('/delete/:id', deleteUser)
router.post('/login');

module.exports = router;
