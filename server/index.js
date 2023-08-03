console.time("App dependencies")
const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
const updateReceipt = require("./updateReceipt");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
console.timeEnd("App dependencies")

let port = process.env.APP_PORT;

console.time("App route")
app.get("/", (req, res) => {
    res.send("Welcome to EcoLife.");
})

// Routes
const userRoute = require("./routes/user");
app.use("/user", userRoute);

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

const storeRoute = require('./routes/store');
app.use("/store", storeRoute);

const locationRoute = require("./routes/locations");
app.use("/locations", locationRoute);

const trialRoute = require("./routes/trials");
app.use("/trials", trialRoute)
console.timeEnd("App route")

console.time("Sequelize")
const { sequelize } = require("./models");
sequelize.sync({ alter: true }).then(() => { // remove if using SQLite
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
})
.catch(error => {
  console.log(error)
})



console.timeEnd("Sequelize")
