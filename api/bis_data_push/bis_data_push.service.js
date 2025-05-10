const { pool } = require('../../config/database')
module.exports = {

    getOpDatas: (callback) => {
        pool.query(
            `SELECT op_slno, op_visit_date, op_total_op, op_new_reg, op_visit, op_registration_fee, op_visit_fee, 
            op_collection_total, op_canel_count, op_canel_amount, op_update_user, op_update_date
            FROM bis_outpatient_visit`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    // getOpModuleData: (callback) => {
    //     pool.query(
    //         `select op_module_slno, total_op, last_total_op_update_date, op_new_reg, last_new_reg_update_date, op_visit, last_visit_update_date,
    //          op_registration_fee, last_reg_fee_update_date, op_visit_fee, last_visit_fee_update_date, op_collection_total,
    //          last_collection_total_update_date, op_canel_count, last_canel_count_update_date, op_canel_amount, last_canel_amount_update_date
    //          from bis_outpatient_module`, [],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);

    //         }
    //     );
    // },
    getOpModuleData: (callback) => {
        pool.query(
            `select op_module_slno, label_name, last_update_date from bis_outpatient_module`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getOpOracleData: (data, callBack) => {
        pool.query(
            `




            

             `,

            [
                data.fromdate,
                data.todate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },

    insertOpcount: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_outpatient_visit(
                op_visit_date,
                op_total_op,
                op_new_reg,
                op_visit,
                op_company_slno
                )
                VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },


    updatOutpatientModuleTbl: (data, callback) => {
        pool.query(
            `UPDATE bis_outpatient_module 
             SET last_update_date =?
             WHERE op_module_slno IN (1, 2, 3)`,
            [
                data,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    deleteOpData: (data, callback) => {
        pool.query(
            `DELETE FROM bis_outpatient_visit
             WHERE op_visit_date IN (?)`,
            [
                data,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updatOpCount: (data, callback) => {
        pool.query(
            `UPDATE bis_outpatient_visit 
             SET
             op_visit_date=?,
              op_new_reg =?,
              op_company_slno=?
             WHERE op_slno IN (2)`,
            [
                data,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
    updatNewRegOpModule: (data, callback) => {
        pool.query(
            `UPDATE bis_outpatient_module 
             SET last_update_date =?
             WHERE op_module_slno IN (2)`,
            [
                data,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        )
    },
}


