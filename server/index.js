require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
var cors = require("cors");

mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;

db.on("error", (error) => {
  console.log(error);
});

db.once("connected", () => {
  console.log(`Mongo connected`);
});

const mahasiswaRoutes = require("./routes/mahasiswa.route");
const prodiRoutes = require("./routes/prodi.route");
const mataKuliahRoutes = require("./routes/matakuliah.route");
const AuthRoutes = require("./routes/auth.route");

const app = express();

app.use(
  cors({ origin: true, credentials: true, exposedHeaders: "Authorization" })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "welcome to user's service for bookstore",
  });
});

app.use("/mahasiswa", mahasiswaRoutes);
app.use("/prodi", prodiRoutes);
app.use("/matakuliah", mataKuliahRoutes);
app.use("/auth", AuthRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

module.exports = app;
