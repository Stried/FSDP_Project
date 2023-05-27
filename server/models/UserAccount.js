module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define("UserAccount", { // model name
        uniqueID: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        emailAccount: { // Unique Key?
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // UserAccount.associate = (models) => {
    //     UserAccount.hasMany(models.ModelName, {
    //         foreignKey: "userId",
    //         onDelete: "cascade"
    //     })
    // }

    // ModelName.associate = (models) => {
    //     ModelName.belongsTo(models.UserAccount, {
    //         foreignKey: "userId",
    //         as: "user"
    //     })
    // }

    return UserAccount;
}