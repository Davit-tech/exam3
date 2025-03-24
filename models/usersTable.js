import db from "../clients/db.mysql.js";
import helpers from "../utils/helpers.js";
import _ from "lodash";


export default {


    async findByEmail(email) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
            return _.head(rows) || null;
        } catch (error) {
            console.log(error)
        }
    },

    async findById(id) {
        try {
            const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
            return _.head(rows) || null;

        } catch (error) {
            console.log(error)
        }
    },
    async findAll() {
        const [raws] = await db.query(`
            SELECT *
            FROM users`);
        return raws;
    },
    async createUsers(first_name, last_name, email, password) {
        try {
            const hashedPassword = helpers.passwordHash(password);
            const [raws] = await db.query(`
                INSERT INTO users (first_name, last_name, email, password)
                VALUES (?, ?, ?, ?)
            `, [first_name, last_name, email, hashedPassword]);
            console.log("Successfully registered");
            return raws;

        } catch (error) {
            console.log(error)
        }

    },
    async updateUserById(id, { firstname, lastname, email }) {
        try {
            const [result] = await db.query(
                "UPDATE users SET first_name = ?, last_name = ?, email = ? WHERE id = ?",
                [firstname, lastname, email, id]
            );
            return result;
        } catch (error) {
            console.log(error);

        }
    },
    async deleteUserById(id) {
        try {
            const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error(error);

        }
    },


};