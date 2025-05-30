const pool = require('../../config/dbConfig')

module.exports = {
    insertModuleGroup: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_tmc_module_grp_master (tmc_bis_module_user_type, tmc_bis_module_slno,tmc_bis_module_grp_status) VALUES (?, ?, ?)`,
            [
                data.tmc_bis_module_user_type,
                JSON.stringify(data.tmc_bis_module_slno),
                data.tmc_bis_module_grp_status
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
                tmc_bis_module_user_type
            FROM bis_tmc_module_grp_master 
            WHERE tmc_bis_module_user_type = ?`,
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
            'SELECT * FROM bis_tmc_module_grp_master ',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },


    EditModuleGroup: (data, callBack) => {
        pool.query(
            `UPDATE bis_tmc_module_grp_master 
                SET tmc_bis_module_user_type = ?,
                    tmc_bis_module_slno = ?,
                    tmc_bis_module_grp_status = ?
                WHERE tmc_bis_mgro_slno = ?`,
            [
                data.tmc_bis_module_user_type,
                JSON.stringify(data.tmc_bis_module_slno),
                data.tmc_bis_module_grp_status,
                data.tmc_bis_mgro_slno
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