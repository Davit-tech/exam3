import mysql2 from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const {DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE} = process.env;

const dbConfig = {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
};
const connection = await mysql2.createConnection(dbConfig);

export default connection.promise();