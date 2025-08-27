const pool = require('../../config/dbConfig')

module.exports = {

    // select view_mast_slno, view_emp_no, view_module_slno, view_menu_slno, view_sub_menu_slno, sub_menu_view_rights
    //  from bis_graphicalview_master;


    // emp_no: parseInt(employee),
    // menu_slno: parseInt(menuName)

    validateGroupRights: (data, callBack) => {
        pool.query(
            `SELECT  view_mast_slno, view_emp_no, view_module_slno, view_menu_slno, view_sub_menu_slno, sub_menu_view_rights
                FROM bis_graphicalview_master 
                WHERE view_emp_no = ? AND view_menu_slno =?`,
            [
                data.emp_no,
                data.menu_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getSubMenuSlno: (data, callBack) => {
        pool.query(
            `SELECT bis_sub_menu_slno,bis_mod_slno
            FROM bis_sub_menu_master 
            WHERE bis_menu_slno= ?`,

            [
                data.menu_slno,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },

    insertGraphicalViewRight: (data, callBack) => { //Inser Group Rights
        // select view_mast_slno, view_emp_no, view_module_slno, view_menu_slno, view_sub_menu_slno, sub_menu_view_rights
        //  from bis_graphicalview_master;
        // const newArray = [body.emp_no, val.bis_mod_slno, body.menu_slno, val.bis_sub_menu_slno,]

        // [16, 2, 8, 1],
        //     [16, 2, 8, 2],
        //     [16, 2, 8, 3],
        //     [16, 2, 8, 4],
        //     [16, 2, 8, 5],
        //     [16, 2, 8, 6],
        //     [16, 2, 8, 7],
        //     [16, 2, 8, 8]

        pool.query(
            `INSERT INTO bis_graphicalview_master (
                view_emp_no,
                view_module_slno,
                view_menu_slno,
                view_sub_menu_slno
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
    getGroupSubMenuRigths: (data, callBack) => {
        pool.query(
            `  SELECT 
    g.view_mast_slno,
    g.view_emp_no,
    g.view_module_slno, 
    g.view_menu_slno,
    g.view_sub_menu_slno,
    g.sub_menu_view_rights,
    s.bis_sub_menu_name,
    s.bis_menu_slno
FROM bis_graphicalview_master g
RIGHT JOIN bis_sub_menu_master s 
    ON s.bis_sub_menu_slno = g.view_sub_menu_slno   
    AND s.bis_menu_slno = g.view_menu_slno          
WHERE g.view_menu_slno = ? 
  AND g.view_emp_no = ?`,
            [
                data.menu_slno,
                data.emp_no,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    updateGraphicalViewRights: (data, callBack) => {



        // const postData = {
        //     menu_view: sub_menu_view_rights === 0 ? 1 : 0,
        //     emp_no: view_emp_no,
        //     menu_slno: view_menu_slno,
        //     view_mast_slno: view_mast_slno
        // }

        // view_mast_slno, view_emp_no, view_module_slno, view_menu_slno, view_sub_menu_slno, sub_menu_view_rights



        pool.query(
            `UPDATE bis_graphicalview_master
                SET sub_menu_view_rights = ?
                WHERE view_mast_slno = ?`,
            [
                data.menu_view,
                data.view_mast_slno
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }

                return callBack(null, results)
            }
        )
    },
    getGraphicalViewRights: (id, callBack) => {
        pool.query(
            `
             SELECT 
    g.view_mast_slno,
    g.view_emp_no,
    g.view_module_slno, 
    g.view_menu_slno,
    g.view_sub_menu_slno,
    g.sub_menu_view_rights,
    s.bis_sub_menu_name,
    s.bis_menu_slno
FROM bis_graphicalview_master g
RIGHT JOIN bis_sub_menu_master s 
    ON s.bis_sub_menu_slno = g.view_sub_menu_slno   
    AND s.bis_menu_slno = g.view_menu_slno          
WHERE g.sub_menu_view_rights = 1 
  AND g.view_emp_no = ?`,
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


