'use strict';

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const db = {};
require("dotenv").config();

let sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "data/ecolifeMain.sqlite"
});