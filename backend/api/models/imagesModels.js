module.exports = (sequelize, Sequelize) => {
    const PostsModel = sequelize.define(
        "images",
        {
            imageid: {
                type: Sequelize.BIGINT(35),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            url:{
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            created: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );
    // const Users = require("./accountsModel");
    // Users.hasOne(PostsModel, {
    //   foreignKey: "userid",
    //   allowNull:false
    // });
    // PostsModel.belongsTo(Users);

    return PostsModel;
};
