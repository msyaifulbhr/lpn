import { Sequelize } from "sequelize";

const db = new Sequelize('belajarbaru', 'root', '', {
    host: "localhost",
    dialect: "mysql",
});

export default db;