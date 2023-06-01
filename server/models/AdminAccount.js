const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const AdminAccount = sequelize.define("AdminAccount", {
        adminNo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailAccount: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return AdminAccount;
}