const pool = require('../../config/dbConfig')
// const logger = require('../../logger/logger')

module.exports = {
    insertUserType: (data, callBack) => {
        pool.query(
            `INSERT INTO user_type_master (user_type, use_type_status, create_user, create_date ) VALUES (?, ?, ?, ?)`,
            [
                data.user_type,
                data.user_type_status,
                data.create_user,
                data.create_date
            ],
            (error, results, fields) => {
                if (error) {
                    // logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },

    validateUserTypeExcistOrNot: (data, callBack) => {
        pool.query(
            `SELECT 
                user_type
            FROM user_type_master 
            WHERE user_type = ?`,
            [
                data.user_type
            ],
            (error, results, fields) => {
                if (error) {
                    // logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    GetDatas: (callBack) => {
        pool.query(
            'SELECT * FROM user_type_master',
            (error, results, fields) => {
                if (error) {
                    // logger.error(error)
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    editUserType: (data, callBack) => {

        pool.query(
            `UPDATE user_type_master 
                SET user_type = ?,
                    use_type_status = ?
                WHERE user_type_slno = ?`,
            [
                data.user_type,
                data.user_type_status,
                data.user_type_slno

            ],
            (error, results, fields) => {
                if (error) {
                    // logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
}


