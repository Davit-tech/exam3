import _ from "lodash";
import db from "../clients/db.mysql.js";


export default {

    async createPosts(title, author, text, date, user_id, ) {
        try {
            const [raws] = await db.query(`
                INSERT INTO posts(title, author, text, date, user_id)
                VALUES (?, ?, ?, ?, ?)
            `, [title, author, text, date, user_id]);
            return raws;
        } catch (err) {
            console.log(err)        }
    },

    async findById(post_id, ) {
        try {
            const [rows] = await db.query("SELECT * FROM posts WHERE id = ?", [post_id]);
            return _.head(rows) || null;
        } catch (error) {
            console.log(error);        }
    },
    async deletePostById(id, ) {
        try {
            const [rows] = await db.query("DELETE FROM posts WHERE id = ?", [id]);
            return rows;
        } catch (error) {
            console.log(error);        }
    },
    async editPostById(post_id, title, author, text, date, ) {
        try {
            const [result] = await db.query(`
                UPDATE posts
                SET title  = ?,
                    author = ?,
                    text   = ?,
                    date   = ?
                WHERE id = ?
            `, [title, author, text, date, post_id]);

            if (result.affectedRows === 0) {
                console.log("post not found");
            }

            return {success: true, message: "Post updated successfully"};
        } catch (error) {
            console.log(error);

        }
    }, async countPosts() {
        try {
            const [rows] = await db.query("SELECT COUNT(*) AS count FROM posts");

            return _.get(_.head(rows), 'count', null);
        } catch (error) {
            console.log(error);        }
    },

    async findPaginatedPosts(offset, limit, ) {
        try {
            const [rows] = await db.query(
                "SELECT * FROM posts ORDER BY date DESC LIMIT ? OFFSET ?",
                [limit, offset]
            );
            return rows;
        } catch (error) {
            console.log(error);        }
    },
    async searchPosts(query,) {
        try {
            const searchTerm = `%${query}%`;
            const [rows] = await db.query(`
            SELECT * FROM posts
            WHERE title LIKE ? OR author LIKE ? OR text LIKE ?
            ORDER BY date DESC
        `, [searchTerm, searchTerm, searchTerm]);

            return rows;
        } catch (error) {
            console.log(error);

        }
    },

};