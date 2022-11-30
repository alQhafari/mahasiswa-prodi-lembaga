const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const matakuliahSchema = new mongoose.Schema({
  nama: String,
  mahasiswa: [
    {
      type: Schema.Types.ObjectId,
      ref: "mahasiswas",
    },
  ],
});

module.exports = mongoose.model("matakuliahs", matakuliahSchema);
