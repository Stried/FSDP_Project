"use strict";

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config();

// Create sequelize instance using config
// THis file creates the sequelized instance and reads the model files from the same directory
let sequelize = new Sequelize(
    {
        host: "localhost",
        dialect: 'sqlite',
        storage: "data/ecolife.sqlite",
    }
);
fs.readdirSync(__dirname).filter(file => { // Reads all the files in models
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        console.log("model" + model);
        try {
            db[model.name] = model; // model.name is what is defined in the model
            console.log("Working")
        } catch (err) {
            console.error(err);
        }
        
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;