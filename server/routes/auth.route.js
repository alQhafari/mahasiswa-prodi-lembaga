const router = require("express").Router();
const mahasiswa = require("../controllers/mahasiswa.controller");

router.post("/register", mahasiswa.createMahasiswa);
router.post("/login", mahasiswa.authenticate);

module.exports = router;
