// May need to add some more if not enough stuff or details

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
        carSpeed: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carFuelType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        carFuelConsume: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carProductionDate: {
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
        carWheels: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carLength: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carWidth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carHeight: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    return Store;
}