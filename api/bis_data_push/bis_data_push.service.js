const { pool } = require('../../config/database')
module.exports = {

    getOpDatas: (callback) => {
        pool.query(
            `SELECT tmc_op_slno, tmc_op_visit_date, tmc_op_total_op, tmc_op_new_reg, tmc_op_visit, 
             tmc_op_registration_fee, tmc_op_visit_fee, tmc_op_collection_total, tmc_op_canel_count, 
             tmc_op_canel_amount, tmc_op_update_user, tmc_op_update_date, tmc_op_company_slno
             FROM bis_tmc_outpatient_visit`, [],
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
            `select tmc_op_module_slno, tmc_label_name, tmc_last_update_date from bis_tmc_outpatient_module`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    insertOpcount: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_tmc_outpatient_visit(
                tmc_op_visit_date,
                tmc_op_total_op,
                tmc_op_new_reg,
                tmc_op_visit,
                tmc_op_company_slno
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
            `UPDATE bis_tmc_outpatient_module 
             SET tmc_last_update_date =?
             WHERE tmc_op_module_slno IN (1, 2, 3)`,
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
            `DELETE FROM bis_tmc_outpatient_visit
             WHERE tmc_op_visit_date IN (?)`,
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
            `UPDATE bis_tmc_outpatient_visit 
             SET
             tmc_op_visit_date=?,
             tmc_op_new_reg =?,
             tmc_op_company_slno=?
             WHERE tmc_op_slno IN (2)`,
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
            `UPDATE bis_tmc_outpatient_module 
             SET tmc_last_update_date =?
             WHERE tmc_op_module_slno IN (2)`,
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
             UPDATE bis_tmc_outpatient_visit 
        SET 
            tmc_op_registration_fee = ?, 
            tmc_op_visit_fee = ?, 
            tmc_op_collection_total = ?,
            tmc_op_refund=?,
            tmc_op_company_slno = ? 
        WHERE tmc_op_visit_date = ?
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
            `UPDATE bis_tmc_outpatient_visit 
             SET
             tmc_op_registration_fee=0,
             tmc_op_visit_fee =0,
             tmc_op_collection_total=0,
             tmc_op_refund=0,
             tmc_op_company_slno=0
             WHERE tmc_op_visit_date IN (?)`,
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
            `UPDATE bis_tmc_outpatient_module 
             SET tmc_last_update_date =?
             WHERE tmc_op_module_slno IN (4,5,6)`,
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

    getIpModuleData: (callback) => {
        pool.query(
            `select tmc_ip_module_slno, tmc_ip_label_name, tmc_ip_last_update_date from bis_tmc_inpatient_module`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    // getKmcIpModuleData: (callback) => {
    //     pool.query(
    //         `select kmc_ip_module_slno, kmc_ip_label_name, kmc_ip_last_update_date from bis_kmc_inpatient_module`, [],
    //         (error, results, feilds) => {
    //             if (error) {
    //                 return callback(error);
    //             }
    //             return callback(null, results);

    //         }
    //     );
    // },


    // SELECT kmc_ip_slno, kmc_ip_date, kmc_ip_total_admission, kmc_ip_total_discharge, kmc_ip_dama, kmc_ip_dis_gross, kmc_ip_dis_net, kmc_ip_receipt_count, kmc_ip_receipt_amount,
    //  kmc_ip_bill_insurance_count, kmc_ip_bill_cash_count, kmc_ip_bill_credit_card, kmc_ip_bill_cash, kmc_ip_update_user, kmc_ip_update_date, ktmc_ip_company_slno FROM bis.bis_kmc_inpatient;

    insertIpAdmissionDatas: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_tmc_inpatient(
                tmc_ip_date,
                tmc_ip_total_admission,
                tmc_ip_company_slno)
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
    UpdateIpAdmsnModuleTbl: (data, callback) => {
        pool.query(
            `
             UPDATE bis_tmc_inpatient_module 
             SET tmc_ip_last_update_date =?
             WHERE tmc_ip_module_slno IN (1)`,
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

    updateDischargeCount: (values, callback) => {
        const sql = `
                  UPDATE bis_tmc_inpatient 
            SET 
                tmc_ip_total_discharge = ?, 
                tmc_ip_company_slno = ? 
            WHERE tmc_ip_date = ?
        `;

        const promises = values.map(([date, disCount, companySlno]) => {
            return new Promise((resolve, reject) => {
                pool.query(sql, [disCount, companySlno, date], (err, results) => {
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

    UpdateIpDischgModuleTbl: (data, callback) => {
        pool.query(
            `
             UPDATE bis_tmc_inpatient_module 
             SET tmc_ip_last_update_date =?
             WHERE tmc_ip_module_slno IN (2)`,
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

