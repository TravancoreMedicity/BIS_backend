// const pool = require('../../config/dbConfig')

const pool = require("../../config/dbConfig");

module.exports = {
    InsertSubMenuName: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_sub_menu_master ( bis_sub_menu_name, bis_mod_slno, bis_menu_slno,bis_sub_menu_status) VALUES (?, ?, ?, ?)`,
            [
                data.Sub_Menu_name,
                data.Module_slno,
                data.Menu_name,
                data.Sub_Menu_status
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
                bis_sub_menu_name
            FROM bis_sub_menu_master 
            WHERE bis_sub_menu_name = ?`,
            [
                data.Sub_Menu_name
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
            'SELECT * FROM bis_sub_menu_master',
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    UpdateSubMenuName: (data, callBack) => {
        // console.log("service", data);

        pool.query(
            `UPDATE bis_sub_menu_master 
                SET
                  bis_sub_menu_name=?,
                  bis_mod_slno=?,
                  bis_menu_slno=?,
                  bis_sub_menu_status=?
                WHERE bis_sub_menu_slno = ?`,
            [
                data.Sub_Menu_name,
                data.Module_slno,
                data.Menu_name,
                data.Sub_Menu_status,
                data.Sub_Menu_slno
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