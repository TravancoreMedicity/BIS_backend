const pool = require('../../config/dbConfig')

module.exports = {
    InsertMenuName: (data, callBack) => {
        pool.execute(
            `INSERT INTO bis_menu_name ( bis_menu_name, bis_menu_module, bis_menu_status) VALUES ( ?, ?, ?)`,
            [
                data.Menu_name,
                data.module_name,
                data.Menu_status
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
    validateMenuNameExcistOrNot: (data, callBack) => {
        pool.query(
            `SELECT 
                bis_menu_name
            FROM bis_menu_name 
            WHERE bis_menu_name = ?`,
            [
                data.Menu_name
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
            'SELECT * FROM bis_menu_name',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateMenuName: (data, callBack) => {
        // console.log("service", data);

        pool.query(
            `UPDATE bis_menu_name 
                SET bis_menu_name = ?,
                bis_menu_module=?,
                    bis_menu_status = ?
                WHERE bis_menu_slno = ?`,
            [
                data.Menu_name,
                data.module_name,
                data.Menu_status,
                data.Menu_slno
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