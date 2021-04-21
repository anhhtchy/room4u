module.exports = (sequelize, Sequelize) => {
  const PostsModel = sequelize.define(
    "posts",
    {
      postid: {
        type: Sequelize.BIGINT(35),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },

      estatetype: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },

      address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      ward: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      district: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      city: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },

      area: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },
      roomnum: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      restroom: {
        type: Sequelize.STRING(2048),
        allowNull: true,
      },
      electricity: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      water: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },
      wifi: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      ultility: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
      rented: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      expired: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  // const Users = require("./accountsModel");
  // Users.hasOne(PostsModel, {
  //   foreignKey: "userId",
  // });
  // PostsModel.belongsTo(Users);

  return PostsModel;
};
