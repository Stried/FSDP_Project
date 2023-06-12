// idk if I can change these database later

module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        carName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carDescription: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carPrice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carModel: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carModification: { // engine
            type: DataTypes.STRING,
            allowNull: false
        },
        carStartProduction: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        carBodyType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carSeats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carDoors: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carFuelConsume: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carFuelType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carSpeed: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
        
    }    
)}
