module.exports = (sequelize, DataTypes) => {
    const UserAccount = sequelize.define("UserAccount", { // model name
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
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
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageFile: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        }
    });

    UserAccount.associate = (models) => {
        UserAccount.hasOne(models.AdminAccount, {
            foreignKey: "emailAccount",
            onDelete: "cascade"
        });
    };

    return UserAccount;
}