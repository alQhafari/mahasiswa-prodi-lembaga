const router = require("express").Router();
const mahasiswa = require("../controllers/mahasiswa.controller");

router.get("/", mahasiswa.getAllMahasiswa);
router.get("/profile", mahasiswa.authenticateJWT);
router.get("/:nim", mahasiswa.getOneMahasiswa);
router.post("/:nim/matakuliah/:kodematkul", mahasiswa.addMatkul);
router.put("/:nim/matakuliah/:kodematkul", mahasiswa.deleteMatkul);

module.exports = router;
