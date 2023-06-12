const express = require("express");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

let port = process.env.APP_PORT;

app.get("/", (req, res) => {
    res.send("Welcome to EcoLife. Chunny is Love, Chunny is Life. <3");
})

// Routes
const allRoutes = require('./routes/ecolife');
app.use("/", allRoutes);
const userRoute = require("./routes/user");
app.use("/user", userRoute);
const fileRoute = require('./routes/file');
app.use("/file", fileRoute);

const db = require("./models");
db.sequelize.sync({ alter: true }).then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
})
