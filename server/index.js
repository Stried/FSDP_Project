const express = require("express");
require("dotenv").config();

const app = express();
app.use("cors");

let port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.send("Welcome to EcoLife");
})

const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
})
