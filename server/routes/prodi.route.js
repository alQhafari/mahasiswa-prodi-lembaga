const router = require("express").Router();
const prodi = require("../controllers/prodi.controller");

router.get("/", prodi.getAllprodi);
router.post("/", prodi.createprodi);

module.exports = router;
