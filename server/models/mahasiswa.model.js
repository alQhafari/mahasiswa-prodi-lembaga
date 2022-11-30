const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const Prodi = require("./prodi.model");

const userSchema = new mongoose.Schema({
  nim: String,
  nama: String,
  angkatan: Number,
  password: String,
  prodi: [
    {
      type: Schema.Types.ObjectId,
      ref: "prodis",
      required: true,
    },
  ],
  matakuliah: [
    {
      type: Schema.Types.ObjectId,
      ref: "matakuliahs",
    },
  ],
});

module.exports = mongoose.model("mahasiswas", userSchema);
