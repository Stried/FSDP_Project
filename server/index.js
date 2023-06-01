const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

let port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.send("Welcome to EcoLife. Where are my children?!");
})

// Routes
const allRoutes = require('./routes/ecolife');
app.use("/", allRoutes);
const userRoute = require("./routes/user");
app.use("/user", userRoute);
const adminRoute = require("./routes/admin")

const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
})
