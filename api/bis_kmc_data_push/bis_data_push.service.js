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
    ////////IP

    getKmcIpModuleData: (callback) => {
        pool.query(
            `select kmc_ip_module_slno, kmc_ip_label_name, kmc_ip_last_update_date from bis_kmc_inpatient_module`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },


    // SELECT kmc_ip_slno, kmc_ip_date, kmc_ip_total_admission, kmc_ip_total_discharge, kmc_ip_dama, kmc_ip_dis_gross, kmc_ip_dis_net, kmc_ip_receipt_count, kmc_ip_receipt_amount,
    //  kmc_ip_bill_insurance_count, kmc_ip_bill_cash_count, kmc_ip_bill_credit_card, kmc_ip_bill_cash, kmc_ip_update_user, kmc_ip_update_date, ktmc_ip_company_slno FROM bis.bis_kmc_inpatient;

    insertIpAdmissionDatas: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_kmc_inpatient(
                kmc_ip_date,
                kmc_ip_total_admission,
                kmc_ip_company_slno)
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
             UPDATE bis_kmc_inpatient_module 
             SET kmc_ip_last_update_date =?
             WHERE kmc_ip_module_slno IN (1)`,
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
        // console.log("values", values);

        const sql = `
                  UPDATE bis_kmc_inpatient 
            SET 
                kmc_ip_total_discharge = ?, 
                kmc_ip_company_slno = ? 
            WHERE kmc_ip_date = ?
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
             UPDATE bis_kmc_inpatient_module 
             SET kmc_ip_last_update_date =?
             WHERE kmc_ip_module_slno IN (2)`,
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
    getKmcPharmaSalesModuleData: (callback) => {
        pool.query(
            `Select kmc_pharmacy_slno, kmc_pharma_last_update, kmc_pharma_labels from bis_kmc_pharmacy_sales_module`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}


