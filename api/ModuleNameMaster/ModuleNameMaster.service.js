const pool = require('../../config/dbConfig')

module.exports = {
    insertModuleName: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_module_name (bis_module_name, bis_module_status) VALUES (?, ?)`,
            [
                data.module_name,
                data.module_status
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
                bis_module_name.bis_module_name
            FROM bis_module_name 
            WHERE bis_module_name.bis_module_name = ?`,
            [
                data.module_name
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
            'SELECT * FROM bis_module_name where bis_module_name.bis_module_status=1',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    GetAllModules: (callBack) => {
        pool.query(
            'SELECT * FROM bis_module_name ',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    UpdateModuleName: (data, callBack) => {
        // console.log("service", data);

        pool.query(
            `  UPDATE bis_module_name 
                SET bis_module_name = ?,
                bis_module_status = ?
                WHERE bis_module_slno = ?`,
            [
                data.module_name,
                data.module_status,
                data.module_slno
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