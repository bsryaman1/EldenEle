const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const advertRouter= require("./routes/AdvertRouters");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://Loiy:12345@eldenele.wpz9e6v.mongodb.net/eldenele?retryWrites=true&w=majority", {
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

app.listen(5000, () => {
  console.log("server started on port 5000");
});