const { pool } = require('../../config/database')
module.exports = {
    labDetails: (data, callBack) => {
        pool.query(
            `SELECT kmc_lab_slno, kmc_lab_date, kmc_lab_total_count, kmc_lab_op_total_count, kmc_lab_ip_total_count, 
             kmc_lab_refund_count, kmc_lab_op_total_amt, kmc_lab_ip_total_amt, kmc_lab_refund_amt, kmc_lab_op_refund_amt,
             kmc_lab_ip_refund_amt, kmc_lab_total_cash_amt, kmc_lab_total_credit_amt, kmc_lab_total_inpatient_amt,
             kmc_lab_micro_count, kmc_lab_micro_amt, kmc_lab_haemato_count, kmc_lab_haemato_amt,
             kmc_lab_bio_chemist_count, kmc_lab_bio_chemist_amt, kmc_lab_clinical_pathology_count,
             kmc_lab_clinical_pathology_amt, kmc_lab_update_user, kmc_lab_update_date, kmc_lab_company_slno
             FROM bis_kmc_lab_master where kmc_lab_date between ? and ?
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


