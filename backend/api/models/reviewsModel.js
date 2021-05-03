module.exports = (sequelize, Sequelize) => {
    const ReviewsModel = sequelize.define(
        "reviews",
        {
            rating: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            comment: {
                type: Sequelize.STRING(2048),
                allowNull: true,
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

    return ReviewsModel;
};
