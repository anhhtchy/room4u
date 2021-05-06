module.exports = (sequelize, Sequelize) => {
  const savedPostsModel = sequelize.define(
    "savedPosts",
    {
      saveid: {
        type: Sequelize.BIGINT(35),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      // postid: {
      //   type: Sequelize.BIGINT(35),
      //   allowNull: false,
      //   primaryKey: true,
      // },
      // userid: {
      //   type: Sequelize.BIGINT(35),
      //   allowNull: false,
      //   primaryKey: true,
      // },
    },
    // {
    //   postid: {
    //     type: Sequelize.BIGINT(35),
    //     allowNull: false,
    //     references: {
    //       model: require("./postsModel")(sequelize, Sequelize),
    //       key: "id",
    //     },
    //   },
    //   userid: {
    //     type: Sequelize.BIGINT(35),
    //     allowNull: false,
    //     references: {
    //       model: require("./accountsModel")(sequelize, Sequelize),
    //       key: "id",
    //     },
    //   },
    // },
    {
      timestamps: false,
    }
  );
  return savedPostsModel;
};
