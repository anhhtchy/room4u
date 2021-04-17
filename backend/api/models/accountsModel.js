module.exports = (sequelize,Sequelize) =>{
    const AccountsModel = sequelize.define('accounts',{
        userid: {
            type:Sequelize.BIGINT(35), allowNull: false, autoIncrement:true, primaryKey: true
        },

        username:{
            type: Sequelize.STRING(50), allowNull:false, unique: true
        },

        fullname:{
            type: Sequelize.STRING(50), allowNull: false
        }, 

        password:{
            type: Sequelize.STRING, allowNull:false
        },
        
        email:{
            type: Sequelize.STRING(100), allowNull:false
        },

        avatar:{
            type:Sequelize.STRING, defaultValue:''
        },

        address:{
            type:Sequelize.STRING
        },

        usertype:{
            type:Sequelize.INTEGER, allowNull:false
        },

        phone:{
            type: Sequelize.STRING(20)
        },

        created: {
            type: Sequelize.DATE
        }
    },{
        timestamps: false,
    });
    
    return AccountsModel;
}