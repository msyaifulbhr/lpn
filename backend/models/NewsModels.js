import {Sequelize} from "sequelize";
import db from "../config/Database.js";
import Admin from "./AdminModel.js";

const {DataTypes} = Sequelize;

const News = db.define('news',{
    uuid : {
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNullValues : false,
        validate : {
            notEmpty: true
        }
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    image : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    ket : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    url : {
        type : DataTypes.STRING
    },
    userId : {
        type : DataTypes.TEXT,
        allowNull : true,
        validate : {
            notEmpty: false
        }
    },
}, {
    freezeTableName: true
});

Admin.hasMany(News);
News.belongsTo(Admin);

export default News;