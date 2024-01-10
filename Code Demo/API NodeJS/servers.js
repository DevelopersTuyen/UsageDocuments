const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const route = require("./routes");
const path = require("path");
const app = express();
// const ip = process.env.IP || "http://133.18.243.148/"; //133.18.200.97
const ip = process.env.IP || "127.0.0.1";
const port = process.env.PORT || 446;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

//app.use(express.static(path.join(__dirname, 'public')));
app.use("/files", express.static(path.join(__dirname, "files")));

route(app);

mongoose
  .connect("mongodb://127.0.0.1:27017/ShowRomAppTest")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

app.listen(port, ip, () => {
  console.log("PORT connected: " + ip + ":" + port);
});
