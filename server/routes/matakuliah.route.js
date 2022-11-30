const router = require("express").Router();
const matakuliah = require("../controllers/matakuliah.controller");

router.get("/", matakuliah.getAllMatakuliah);
router.post("/", matakuliah.createMatakuliah);

module.exports = router;
