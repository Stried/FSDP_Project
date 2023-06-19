// May need to add some more if not enough stuff or details.
// Remember to trunce/drop table in MySQL workbench if changed.

module.exports = (sequelize, DataTypes) => {
    const Store = sequelize.define("Store", {
        carPlateNo: { // SBA1234A
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        carDescription: { // My first car, got hungry so I ate half the engine but it still runs as per normal. No braking past 20km/h
            type: DataTypes.TEXT, 
            allowNull: false
        },
        carPrice: { // $239,000,000 (exc. GST)
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carBrand: { // Tesla
            type: DataTypes.STRING,
            allowNull: false
        },
        carModel: { // Model X2.1 Extravagant Luxurious Opulent Magnificent Superlative Superior Grandiose Automobile of Epic Proportions (ELOMSGAPEP)
            type: DataTypes.STRING,
            allowNull: false
        },
        carEngine: { // 1.0 Kappa T-GDI (100 Hp) Automatic (optional?)
            type: DataTypes.STRING,
            allowNull: false
        },
        carSpeed: { // 2,350km/h
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carFuelType: { // Electric, Hybrid
            type: DataTypes.STRING,
            allowNull: false
        },
        carFuelConsume: { // 18.6kWh - 24.9kWh/100 km
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carProductionDate: { // ddMMMyyyy
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        carBodyType: { // hatchback, convertible, SUV, coupe, sedan, minivan, sports car
            type: DataTypes.STRING,
            allowNull: false
        },
        carColor: { // Quarantine Lavender
            type: DataTypes.STRING,
            allowNull: false
        },
        carSeats: { // 2, 4, etc
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carLength: { // 2.31m
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carWidth: { // 1.32m
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carHeight: { // 1.55m
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isModified: { // Yes, No
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        carMods: { // It has 18 wheels, tank threads, and comes installed with a 125mm railcannon. Radio only plays "Majulah Singapura" on loop at max volume.
            type: DataTypes.TEXT,
            allowNull: false // add a placeholder such as "No Mods made"
        }
    });

    Store.associate = (models) => {
        Store.hasOne(models.TrialCar, {
            foreignKey: "carPlateNo",
            onDelete: "cascade"
        });
    };

    return Store;
}