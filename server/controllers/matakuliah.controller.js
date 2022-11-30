const e = require("express");
const Matakuliah = require("../models/matakuliah.model");
const Mahasiswa = require("../models/mahasiswa.model");

async function getAllMatakuliah(req, res) {
  try {
    const data = await Matakuliah.find();
    res.status(200).json({
      message: "menampilkan semua Matakuliah",
      data,
    });
  } catch (error) {
    res.status(404).json({
      message: "tidak ada Matakuliah",
      error: error.message,
    });
  }
}
async function createMatakuliah(req, res) {
  // isi fungsi untuk membuat Matakuliah baru
  const matakuliah = new Matakuliah({
    nama: req.body.nama,
    mahasiswa: req.body.mahasiswa,
  });

  try {
    const matakuliahInput = await matakuliah.save();
    res.status(201).json({
      message: "Matakuliah berhasil dibuat",
      data: matakuliahInput,
    });
  } catch (error) {
    res.status(400).json({
      message: "tidak ada Matakuliah",
      error: error.message,
    });
  }
}

module.exports = {
  getAllMatakuliah,
  createMatakuliah,
};
