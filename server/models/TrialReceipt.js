module.exports = (sequelize, DataTypes) => {
const TrialReceipt=sequelize.define("TrialReceipt",{
trialReceiptId:{
    type:DataTypes.STRING,
    allowNull:false
},
dateOfTrial:{
    type:DataTypes.DATEONLY,
    allowNull:false
},
phoneNumber:{
    type:DataTypes.INTEGER,
    allowNull:false
},
trialReport:{
    type:DataTypes.STRING,
    allowNull:true
}

});
TrialReceipt.associate = (models) => {
    TrialReceipt.hasOne(models.UserAccount, {
        foreignKey: "userId",
        onDelete: "cascade"
    });
};
    return TrialReceipt;
}