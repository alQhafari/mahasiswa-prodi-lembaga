const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const prodiSchema = new mongoose.Schema({
  nama: String,
});
prodiSchema.virtual("mahasiswa", {
  ref: "mahasiswas", //The Model to use
  localField: "_id", //Find in Model, where localField
  foreignField: "prodis", // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
prodiSchema.set("toObject", { virtuals: true });
prodiSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("prodis", prodiSchema);
