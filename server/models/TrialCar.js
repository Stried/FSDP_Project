module.exports = (sequelize, DataTypes) => {
    const TrialCar = sequelize.define("TrialCar", {
        name:{
            type: DataTypes.STRING
        },
        // based off the carplate
        // enter carplate as teh form
        // take model from data base with carplate as PK

        carBrand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // let a = Store.findOne ({where: {carPlate = data.carPlate}}) | data.modelName = a.carPlate;
        // ^ finds from Store database
        address:{
            type:DataTypes.STRING,
            allowNull:false
        }
    });
     TrialCar.associate = (models) => {
         TrialCar.belongsTo(models.Store, {
             foreignKey: "carPlateNo",
             as: "carplate"
         });
     };

    return TrialCar;
}