module.exports = (sequelize, Sequelize) => {
    const CommentsModel = sequelize.define(
        "comments",
        {
            commentid: {
                type: Sequelize.BIGINT(35),
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
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

    return CommentsModel;
};
