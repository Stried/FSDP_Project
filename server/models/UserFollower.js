module.exports = (sequelize, DataTypes) => {
    const UserFollower = sequelize.define("UserFollower", {
        followedUserEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    UserFollower.associate = (models) => {
        UserFollower.belongsTo(models.UserAccount, {
            foreignKey: "emailAccount",
            as: "followers"
        });
    };

    return UserFollower;
}