const { pool } = require('../../config/database')
module.exports = {

    getOpDatas: (callback) => {
        pool.query(
            `SELECT kmc_op_slno, kmc_op_visit_date, kmc_op_total_op, kmc_op_new_reg, kmc_op_visit, 
             kmc_op_registration_fee, kmc_op_visit_fee, kmc_op_collection_total,kmc_op_refund,kmc_op_canel_count, 
             kmc_op_canel_amount, kmc_op_update_user, kmc_op_update_date, kmc_op_company_slno
             FROM bis_kmc_outpatient_visit`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getOpModuleData: (callback) => {
        pool.query(
            `select kmc_op_module_slno, kmc_label_name, kmc_last_update_date from bis_kmc_outpatient_module`, [],
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
            `INSERT INTO bis_kmc_outpatient_visit(
                kmc_op_visit_date,
                kmc_op_total_op,
                kmc_op_new_reg,
                kmc_op_visit,
                kmc_op_company_slno
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
            `UPDATE bis_kmc_outpatient_module 
             SET kmc_last_update_date =?
             WHERE kmc_op_module_slno IN (1, 2, 3)`,
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
            `DELETE FROM bis_kmc_outpatient_visit
             WHERE kmc_op_visit_date IN (?)`,
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
            `UPDATE bis_kmc_outpatient_visit 
             SET
             kmc_op_visit_date=?,
             kmc_op_new_reg =?,
             kmc_op_company_slno=?
             WHERE kmc_op_slno IN (2)`,
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
            `UPDATE bis_kmc_outpatient_module 
             SET kmc_last_update_date =?
             WHERE kmc_op_module_slno IN (2)`,
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
    updateCashcreditCount: (values, callback) => {
        const sql = `
             UPDATE bis_kmc_outpatient_visit 
        SET 
            kmc_op_registration_fee = ?, 
            kmc_op_visit_fee = ?, 
            kmc_op_collection_total = ?,
            kmc_op_refund=?,
            kmc_op_company_slno = ? 
        WHERE kmc_op_visit_date = ?
    `;

        const promises = values.map(([date, regFee, visitFee, total, refund, companySlno]) => {
            return new Promise((resolve, reject) => {
                pool.query(sql, [regFee, visitFee, total, refund, companySlno, date], (err, results) => {
                    if (err) return reject(err);
                    resolve(results.affectedRows);
                });
            });
        });

        Promise.all(promises)
            .then(results => {
                const totalAffected = results.reduce((acc, curr) => acc + curr, 0);
                callback(null, { affectedRows: totalAffected });
            })
            .catch(error => callback(error));
    },


    deleteOpCashCreditData: (data, callback) => {
        pool.query(
            `UPDATE bis_kmc_outpatient_visit 
             SET
             kmc_op_registration_fee=0,
             kmc_op_visit_fee =0,
             kmc_op_collection_total=0,
             Kmc_op_refund=0,
             kmc_op_company_slno=0
             WHERE kmc_op_visit_date IN (?)`,
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
    updateOpCashCreditData: (data, callback) => {
        pool.query(
            `UPDATE bis_kmc_outpatient_module 
             SET kmc_last_update_date =?
             WHERE kmc_op_module_slno IN (4,5,6)`,
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


