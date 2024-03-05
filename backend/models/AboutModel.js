import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Admin from "./AdminModel.js";

const {DataTypes} = Sequelize;

const Abouts = db.define('abouts', {
    uuid : {
        type : DataTypes.STRING,
        defaultValue : DataTypes.UUIDV4,
        allowNullValues : false,
        validate : {
            notEmpty: true
        }
    },
    history : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    vision : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    mision : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty: true
        }
    },
    values : {
        type : DataTypes.TEXT,
        allowNull : false,
        validate : {
            notEmpty: true
        }
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

Admin.hasMany(Abouts);
Abouts.belongsTo(Admin);

export default Abouts;