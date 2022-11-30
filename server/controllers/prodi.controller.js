const e = require("express");
const Prodi = require("../models/prodi.model");
const Mahasiswa = require("../models/mahasiswa.model");

async function getAllprodi(req, res) {
  try {
    const prodi = await Prodi.find();
    res.status(200).json({
      message: "menampilkan semua prodi",
      prodi,
    });
  } catch (error) {
    res.status(404).json({
      message: "tidak ada prodi",
      error: error.message,
    });
  }
}
async function createprodi(req, res) {
  // isi fungsi untuk membuat prodi baru
  const pass = req.body.password;
  const prodi = new Prodi({
    nama: req.body.nama,
    prodiId: req.body._id,
  });

  try {
    const prodiInput = await prodi.save();
    res.status(201).json({
      message: "prodi berhasil dibuat",
      data: prodiInput,
    });
  } catch (error) {
    res.status(400).json({
      message: "tidak ada prodi",
      error: error.message,
    });
  }
}

module.exports = {
  getAllprodi,
  createprodi,
};
