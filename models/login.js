const { pool } = require('../startup/mysql_database');

function getPassword(email, table) {
    let field = 'email';
    if (table == 'corporate_customer') {    
        field = 'corporate_email';
    }
    return new Promise((resolve, reject) => {
        const result = pool.query(`SELECT * FROM ${table} WHERE ${field}=?`,
            [
                email
            ],
            function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                if (!results) {
                    resolve(null);
                }
                else {
                    resolve(results[0]);
                    
                }
                
            }
        )
    });

}

exports.getPassword = getPassword;