module.exports = (sequelize, Sequelize) => {
  const LocationsModel = sequelize.define(
    "districts",
    {
      districtid: {
        type: Sequelize.STRING(5),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },

      cityid: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return LocationsModel;
};
