const { DataTypes } = require("sequelize");
// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Locations = sequelize.define("Locations", {
        LatAxis: { // 1.3759366 (Hougang)
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        LongAxis: { // 103.878986 (Hougang)
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        locationName: { // Hougang Mall
            type: DataTypes.STRING,
            allowNull: false
        },
        streetName: { // Hougang Ave 1
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: { // 673828
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        status: { // 1, 0
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        fastCharge: { // 1, 0
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        noOfChargers: { // 4, 8, 12, etc.
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: { // Mangoes are cooooooooooooooooool
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return Locations;
}