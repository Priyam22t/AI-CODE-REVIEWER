const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/review", require("./routes/review.route"));

module.exports = app;
