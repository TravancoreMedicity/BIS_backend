const pool = require('../../config/dbConfig')

module.exports = {
    insertModuleGroup: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_module_grp_master (bis_module_user_type, bis_module_slno,bis_module_grp_status) VALUES (?, ?, ?)`,
            [
                data.module_user_type,
                JSON.stringify(data.module_slno),
                data.module_grp_status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    validateModuleNameExcistOrNot: (data, callBack) => {
        pool.query(
            `SELECT 
                bis_module_user_type
            FROM bis_module_grp_master 
            WHERE bis_module_user_type = ?`,
            [
                data.module_user_type
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    GetDatas: (callBack) => {
        pool.query(
            'SELECT * FROM bis_module_grp_master ',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },


    EditModuleGroup: (data, callBack) => {
        pool.query(
            `UPDATE bis_module_grp_master 
                SET bis_module_user_type = ?,
                    bis_module_slno = ?,
                    bis_module_grp_status = ?
                WHERE bis_mgro_slno = ?`,
            [
                data.module_user_type,
                JSON.stringify(data.module_slno),
                data.module_grp_status,
                data.module_grp_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

}