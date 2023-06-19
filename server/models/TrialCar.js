module.exports = (sequelize, DataTypes) => {
    const TrialCar = sequelize.define("Trial", {

        modelName:{
            type: DataTypes.STRING,
            allowNull:false
        }
        // based off the carplate
        // enter carplate as teh form
        // take model from data base with carplate as PK

        // let a = Store.findOne ({where: {carPlate = data.carPlate}}) | data.modelName = a.carPlate;
        // ^ finds from Store database
    });
    // TrialCar.associate = (models) => {
    //     TrialCar.hasOne(models.Store, {
    //         foreignKey: "carPlateNo",
    //         onDelete: "cascade"
    //     });
    // };

    return TrialCar;
}