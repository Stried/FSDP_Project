const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const userAccount = sequelize.define("Account Creation", {
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        emailAccount: { // Unique Key?
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return userAccount;
}

module.exports = (sequlize, DataTypes) => {
}