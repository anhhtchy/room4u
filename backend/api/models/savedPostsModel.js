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
    },
    {
      timestamps: false,
    }
  );
  return savedPostsModel;
};
