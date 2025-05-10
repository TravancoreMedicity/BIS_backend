const { pool } = require('../../config/database')
module.exports = {
    labDetails: (data, callBack) => {
        pool.query(
            `SELECT lab_slno, lab_date, lab_total_count, lab_op_total_count, lab_ip_total_count, lab_refund_count,
             lab_op_total_amt, lab_ip_total_amt, lab_refund_amt, lab_op_refund_amt, lab_ip_refund_amt, lab_total_cash_amt,
             lab_total_credit_amt, lab_total_inpatient_amt, lab_micro_count, lab_micro_amt, 
             lab_haemato_count, lab_haemato_amt, lab_bio_chemist_count, lab_bio_chemist_amt,
             lab_clinical_pathology_count, lab_clinical_pathology_amt, lab_update_user, lab_update_date
             FROM bis_lab_master where lab_date between ? and ?
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


