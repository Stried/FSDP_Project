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
        },
        createdAt: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    });

    return UserAccount;
}