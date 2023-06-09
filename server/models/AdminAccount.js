const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const AdminAccount = sequelize.define("AdminAccount", {
        adminNo: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        }
    });

    AdminAccount.associate = (models) => {
        AdminAccount.belongsTo(models.UserAccount, {
            foreignKey: "emailAccount",
            as: "admin"
        });
    };

    return AdminAccount;
}