const mysql = require('mysql2');

function DBManager(conf) {
    const conn = mysql.createConnection(conf);

    const executeQuery = (sql) => {
        return new Promise((resolve, reject) => {      
              conn.query(sql, function (err, result) {
                 if (err) {
                    console.error(err);
                    reject();     
                 }   
                 resolve(result);         
           });
        })
    }

    return {
        createTable: () => {
            return executeQuery(`
                CREATE TABLE IF NOT EXISTS images
                (id INT PRIMARY KEY AUTO_INCREMENT, 
                url VARCHAR(255) NOT NULL) 
            `);      
        },
        selectAll: () => {
            const sql = `
            SELECT id, url FROM images
               `;
            return executeQuery(sql); 
        },
        insert: (imageName) => {
            const template = `
            INSERT INTO images (url) VALUES ('$NAME')
               `;
            let sql = template.replace("$NAME", imageName);
            return executeQuery(sql);
        },
        delete: (id) => {
            let sql = `
                DELETE FROM images
                WHERE id=%ID
            `;
            sql = sql.replace("%ID", id);
            return executeQuery(sql); 
        }
    }
}

module.exports = DBManager;