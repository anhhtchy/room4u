module.exports = (sequelize, Sequelize) => {
    const ReviewsModel = sequelize.define(
        "reviews",
        {
            reviewid: {
                type: Sequelize.BIGINT(35),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
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
