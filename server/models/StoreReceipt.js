module.exports = (sequelize, DataTypes) => {
    const StoreReceipt = sequelize.define("StoreReceipt", {
        carPlate: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        carReceiptId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1
        },
        carBrand: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        carModel: { 
            type: DataTypes.STRING,
            allowNull: false
        },
        cardNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cardHolderName: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        cardExpiryYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cardExpiryMonth: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cvc: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        boughtBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userCity: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userZipCode: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userAddress: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        userPhoneNo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        userEmailAccount: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        carImageFile: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ""
        }
    });

    StoreReceipt.associate = (models) => { // sold by who? WHY DID U STOP WORKING
        StoreReceipt.belongsTo(models.UserAccount, {
            foreignKey: "emailAccount",
            as: "buyers"
        });
    };

    return StoreReceipt;
}