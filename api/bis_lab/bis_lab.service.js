const { pool } = require('../../config/database')
module.exports = {
    labDetails: (data, callBack) => {
        pool.query(
            `SELECT tmc_lab_slno, tmc_lab_date, tmc_lab_total_count, tmc_lab_op_total_count, tmc_lab_ip_total_count, 
             tmc_lab_refund_count, tmc_lab_op_total_amt, tmc_lab_ip_total_amt, tmc_lab_refund_amt, tmc_lab_op_refund_amt,
             tmc_lab_ip_refund_amt, tmc_lab_total_cash_amt, tmc_lab_total_credit_amt, tmc_lab_total_inpatient_amt,
             tmc_lab_micro_count, tmc_lab_micro_amt, tmc_lab_haemato_count, tmc_lab_haemato_amt,
             tmc_lab_bio_chemist_count, tmc_lab_bio_chemist_amt, tmc_lab_clinical_pathology_count,
             tmc_lab_clinical_pathology_amt, tmc_lab_update_user, tmc_lab_update_date, tmc_lab_company_slno
             FROM bis_tmc_lab_master where tmc_lab_date between ? and ?
             `,
            [
                data.fromDate,
                data.toDate
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        )
    },
}


