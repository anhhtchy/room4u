module.exports = (sequelize, Sequelize) => {
    const RatingsModel = sequelize.define(
        "ratings",
        {
            ratingid: {
                type: Sequelize.BIGINT(35),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            created: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated: {
                type: Sequelize.DATE,
                allowNull: false,
            }
        },
        {
            timestamps: false,
        }
    );

    return RatingsModel;
};
