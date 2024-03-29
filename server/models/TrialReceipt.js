module.exports = (sequelize, DataTypes) => {
const TrialReceipt=sequelize.define("TrialReceipt",{
trialReceiptId:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    primaryKey:true,
},
dateOfTrial:{
    type:DataTypes.DATE,
    allowNull:false
},
trialReport:{
    type:DataTypes.STRING,
    allowNull:true,
    defaultValue:null
},
modelName:{
    type:DataTypes.STRING,
    allowNull:false
},
faultResolve:{
    type:DataTypes.STRING,
    allowNull:false,
},
trialStatus:{
    type:DataTypes.STRING,
    allowNull:false
},
emailAccount:{
    type:DataTypes.STRING,
    allowNull:false
},
ratings:{
    type:DataTypes.FLOAT,
    allowNull:true
},

});
TrialReceipt.associate = (models) => {
    TrialReceipt.hasOne(models.UserAccount, {
        foreignKey: "userId",
        onDelete: "cascade"
    });
};

TrialReceipt.associate = (models)=>{
    TrialReceipt.belongsTo(models.TrialCar, {
        foreignKey:"id",
        allowNull:true,
        onDelete:"cascade"
    })
};

    return TrialReceipt;
}