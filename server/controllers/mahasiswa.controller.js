const e = require("express");
const Mahasiswa = require("../models/mahasiswa.model");
const Prodi = require("../models/prodi.model");
const Matakuliah = require("../models/matakuliah.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { use } = require("react");

process.env.TOKEN_SECRET;

const authenticateJWT = (req, res) => {
  const token = req.headers.token;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      res.status(200).json({
        data: user,
      });
    });
  } else {
    res.sendStatus(401);
  }
};

async function getAllMahasiswa(req, res) {
  if ((await Mahasiswa.find()).length === 0) {
    res.status(404).json({
      message: "tidak ada user",
    });
  } else {
    try {
      const data = await Mahasiswa.find()
        .populate("prodi")
        .populate("matakuliah");
      res.status(200).json({
        message: "menampilkan semua user",
        data,
      });
    } catch (error) {
      res.status(404).json({
        message: "gagal",
        error: error.message,
      });
    }
  }
}
async function getOneMahasiswa(req, res) {
  const mhs = await Mahasiswa.find({ nim: req.params.nim })
    .populate("prodi")
    .populate("matakuliah");
  if (mhs.length == 0) {
    res.status(404).json({
      message: "user tidak ditemukan",
    });
  } else {
    res.status(200).json({
      message: "menampilkan satu user",
      data: mhs,
    });
  }
}
async function createMahasiswa(req, res) {
  const mhs = new Mahasiswa({
    nim: req.body.nim,
    nama: req.body.nama,
    angkatan: req.body.angkatan,
    password: req.body.password,
    prodi: req.body.prodiId,
  });
  const prodi = req.body.prodiId;
  try {
    const mahasiswa = await mhs.save();
    const prodiMahasiswa = await Prodi.findById(prodi);
    prodiMahasiswa.mahasiswa.push(mahasiswa);
    await prodiMahasiswa.save();
    res.status(200).json({
      message: "sukses",
      data: mahasiswa,
    });
  } catch (error) {
    res.status(400).json({
      message: "gagal",
      error: "Gagal menambahkan mahasiswa",
    });
  }
}

async function generateAccessToken(mhs) {
  return jwt.sign({ mhs }, process.env.TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

async function authenticate(req, res) {
  const nim = req.body.nim;
  const password = req.body.password;
  const user = await Mahasiswa.findOne({ nim: req.body.nim });

  if (user.password == password) {
    const token = await generateAccessToken(user);
    data = { user, token };
    // res.cookie("jwt", token, { secure: false });
    // res.header("token", token);
    res.status(200).json({
      message: "sukses",
      data: data,
    });
  } else {
    res.status(400).json({
      message: "gagal",
      error: "Password tidak cocok",
    });
  }
}

async function addMatkul(req, res) {
  const mhs = await Mahasiswa.findOneAndUpdate(
    { nim: req.params.nim },
    {
      $push: {
        matakuliah: req.params.kodematkul,
      },
    }
  );
  const mk = await Matakuliah.findOneAndUpdate(
    { _id: req.params.kodematkul },
    {
      $push: {
        mahasiswa: mhs._id,
      },
    }
  );
  try {
    const mahasiswa = await mhs.save();
    const matakuliah = await mk.save();
    res.status(200).json({
      message: "sukses",
      data: mahasiswa,
      matakuliah,
    });
  } catch (error) {
    res.status(400).json({
      message: "gagal",
      error: "Gagal menambahkan matkul mahasiswa",
    });
  }
}
async function deleteMatkul(req, res) {
  const mhs = await Mahasiswa.findOneAndUpdate(
    { nim: req.params.nim },
    {
      $pull: {
        matakuliah: req.params.kodematkul,
      },
    }
  );
  const mk = await Matakuliah.findOneAndUpdate(
    { _id: req.params.kodematkul },
    {
      $pull: {
        mahasiswa: mhs._id,
      },
    }
  );
  try {
    const mahasiswa = await mhs.save();
    const matakuliah = await mk.save();
    res.status(200).json({
      message: "sukses",
      data: mahasiswa,
      matakuliah,
    });
  } catch (error) {
    res.status(400).json({
      message: "gagal",
      error: "Gagal menambahkan matkul mahasiswa",
    });
  }
}

module.exports = {
  getAllMahasiswa,
  getOneMahasiswa,
  createMahasiswa,
  addMatkul,
  authenticate,
  authenticateJWT,
  deleteMatkul,
};
