"use strict";

console.time("DB dependencies")
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};
require('dotenv').config();
console.timeEnd("DB dependencies")

// Create sequelize instance using config
// THis file creates the sequelized instance and reads the model files from the same directory
console.time("DB setup")
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
        timezone: '+08:00'
    }
);
console.timeEnd("DB setup")

// let sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'data/ecolife.sqlite'
//     });

console.time("DB sync")
fs.readdirSync(__dirname).filter(file => { // Reads all the files in models
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        try {
            db[model.name] = model; // model.name is what is defined in the model
        } catch (err) {
            console.error(err);
        }
        
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
console.timeEnd("DB sync")

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;