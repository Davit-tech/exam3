import db from "./clients/db.mysql.js";

(async () => {
    try {

        await db.query(`
            CREATE TABLE IF NOT EXISTS users
            (
                id
                INT
                AUTO_INCREMENT
                PRIMARY
                KEY,
                first_name
                VARCHAR
            (
                50
            ) NOT NULL,
                last_name VARCHAR
            (
                50
            ) NOT NULL,
                email VARCHAR
            (
                100
            ) NOT NULL UNIQUE,
                password VARCHAR
            (
                100
            ) NOT NULL
                )
        `);


        await db.query(`
            CREATE TABLE IF NOT EXISTS posts (
                                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                                 title VARCHAR(255) NOT NULL,
                author VARCHAR(255) NOT NULL,
                text TEXT NOT NULL,
                date DATE NOT NULL,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
                )
        `);

        console.log("Tables created successfully.");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
})();
