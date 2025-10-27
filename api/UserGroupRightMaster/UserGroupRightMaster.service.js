const pool = require('../../config/dbConfig')

module.exports = {

    getModulewiseMenus: (id, callBack) => {
        pool.query(
            `SELECT 
            bis_menu_name.bis_menu_slno, 
            bis_menu_name.bis_menu_name, 
            bis_menu_name.bis_menu_module, 
            bis_menu_name.bis_menu_status, 
            bis_user_group_rights.bis_group_rights_slno, 
            bis_user_group_rights.bis_user_group_slno, 
            bis_user_group_rights.bis_module_slno, 
            bis_user_group_rights.bis_menu_slno, 
            bis_user_group_rights.bis_menu_view, 
            bis_user_group_rights.bis_menu_add, 
            bis_user_group_rights.bis_menu_edit
        FROM 
            bis_menu_name
        LEFT JOIN 
            bis_user_group_rights 
        ON 
            bis_user_group_rights.bis_module_slno = bis_menu_name.bis_menu_module
        WHERE 
            bis_menu_name.bis_menu_module = ?
            AND bis_menu_name.bis_menu_status = 1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    ModulewiseMenus: (id, callBack) => {
        // console.log("Service", id);

        pool.query(
            ` SELECT bis_module_slno
             FROM bis_module_grp_master
             WHERE bis_module_grp_master.bis_module_user_type=?`,
            [id],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    validateGroupRights: (data, callBack) => {
        pool.query(
            `SELECT bis_user_group_slno,
                bis_module_slno,
                bis_menu_slno,
                    bis_group_rights_slno
                FROM bis_user_group_rights 
                WHERE bis_user_group_slno = ? AND bis_module_slno =?`,
            [
                data.user_group_slno,
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getMenuSlno: (data, callBack) => {
        pool.query(
            `SELECT bis_menu_slno
            FROM bis_menu_name 
            WHERE bis_menu_module= ?`,
            [
                data.module_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },

    insertGroupRight: (data, callBack) => { //Inser Group Rights

        pool.query(
            `INSERT INTO bis_user_group_rights (
                bis_user_group_slno,
                bis_module_slno,
                bis_menu_slno
            )
            VALUES ?`,
            [
                data
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getGroupMenuRigths: (data, callBack) => {
        pool.query(
            `SELECT 
            bis_user_group_rights.bis_group_rights_slno,
            bis_menu_name.bis_menu_slno,
            bis_menu_name.bis_menu_module,
            bis_menu_name.bis_menu_name,
            bis_user_group_rights.bis_menu_view,
            bis_user_group_rights.bis_menu_add,
            bis_user_group_rights.bis_menu_edit
        FROM bis_user_group_rights
        RIGHT JOIN bis_menu_name ON bis_menu_name.bis_menu_slno = bis_user_group_rights.bis_menu_slno 
        WHERE bis_menu_name.bis_menu_module = ? AND bis_user_group_slno = ?`,
            [
                data.module_slno,
                data.user_group_slno,


            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateGroupMenuRights: (data, callBack) => {
        pool.query(
            `UPDATE bis_user_group_rights
                SET bis_menu_view = ?
                WHERE bis_group_rights_slno = ?`,
            [
                data.menu_view,
                data.group_rights_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    UserWiseSettingsRights: (id, callBack) => {
        // console.log("Service", id);
        pool.query(
            `
            Select bis_group_rights_slno, bis_user_group_slno, bis_module_slno, bis_user_group_rights.bis_menu_slno, bis_menu_view, bis_menu_add, bis_menu_edit,bis_menu_name.bis_menu_name
             from bis_user_group_rights 
             left join bis_menu_name on bis_menu_name.bis_menu_module=bis_user_group_rights.bis_module_slno and bis_menu_name.bis_menu_slno =bis_user_group_rights.bis_menu_slno
             where bis_user_group_slno=? and bis_menu_view=1 and bis_menu_name.bis_menu_status=1`,
            [id],
            (error, results, fields) => {
                if (error) {
                    // logger.error(error);
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsergrpRights: (callBack) => {
        pool.query(
            `SELECT 
            bis_group_rights_slno, 
            bis_user_group_slno, 
            bis_user_group_rights.bis_module_slno, 
            bis_menu_slno, 
            bis_menu_view, 
            bis_menu_add, 
            bis_menu_edit,
            bis_module_name.bis_module_name 
        FROM bis_user_group_rights 
        LEFT JOIN bis_module_name 
        ON bis_module_name.bis_module_slno = bis_user_group_rights.bis_module_slno`,
            (error, results) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    }

}


