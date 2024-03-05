import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admin from "./AdminModel.js";

const {DataTypes} = Sequelize;

const Services = db.define('services', {
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
    ketser : {
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
},{
    freezeTableNames : true
});


Admin.hasMany(Services);
Services.belongsTo(Admin);

export default Services;