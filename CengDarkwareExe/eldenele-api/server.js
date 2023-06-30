const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const advertRouter= require("./routes/AdvertRouters");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/eldenele", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  // Rota tanımlamaları
app.use("/", userRoutes);
app.use("/adverts",advertRouter);

// Hata yönetimi
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});