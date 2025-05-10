const { pool } = require('../../config/database')
module.exports = {
    getDetails: (data, callBack) => {
        pool.query(
            `SELECT rad_slno, rad_date, rad_total_count, rad_op_total_count, rad_ip_total_count, rad_refund_count,
             rad_op_total_amt, rad_ip_total_amt, rad_refund_amt, rad_op_refund_amt, rad_ip_refund_amt, rad_total_cash_amt,
             rad_total_credit_amt, rad_total_inpatient_amt, rad_mri_count, rad_mri_amt, 
             rad_ct_count, rad_ct_amt, rad_xray_count, rad_xray_amt, rad_usg_count, rad_usg_amt, rad_update_user, rad_update_date
             FROM bis_radiology_master where rad_date between ? and ?
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


