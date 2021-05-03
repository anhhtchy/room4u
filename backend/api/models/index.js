const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorAliases: false,
    dialectModule: require("mysql2"),
    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE),
    },
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
//
db.accounts = require("./accountsModel")(sequelize, Sequelize);
db.posts = require("./postsModel")(sequelize, Sequelize);
//db.images = require('./imagesModels')(sequelize, Sequelize);
//
db.accounts.hasMany(db.posts, {
  foreignKey: "userid",
  allowNull: false,
});
//db.posts.belongsTo(db.accounts);
// Location
db.districts = require("./locationsModels")(sequelize, Sequelize);
// review (rating and comment)
db.reviews = require('./reviewsModel')(sequelize, Sequelize);
db.accounts.hasMany(db.reviews, {
  foreignKey: "userid",
  allowNull: false,
});
db.posts.hasMany(db.reviews, {
  foreignKey: "postid",
  allowNull: false,
});

module.exports = db;
