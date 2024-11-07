import { Sequelize } from "sequelize";

//const DB_CLIENT = new Sequelize("DBTTEST", "logindb", "db123", {
//  host: "localhost",
//  dialect: "mssql",
//});

const DB_CLIENT = new Sequelize("DBTTEST", "sa", "sa123", {
  dialect: "sqlite",
  storage: "./database.sqlite",
});

export default DB_CLIENT;
