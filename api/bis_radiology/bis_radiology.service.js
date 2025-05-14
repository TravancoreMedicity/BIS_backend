const { pool } = require('../../config/database')
module.exports = {
    getDetails: (data, callBack) => {
        pool.query(
            `SELECT tmc_rad_slno, tmc_rad_date, tmc_rad_total_count, tmc_rad_op_total_count,
             tmc_rad_ip_total_count, tmc_rad_refund_count, tmc_rad_op_total_amt, tmc_rad_ip_total_amt, 
             tmc_rad_refund_amt, tmc_rad_op_refund_amt, tmc_rad_ip_refund_amt, tmc_rad_total_cash_amt, 
             tmc_rad_total_credit_amt, tmc_rad_total_inpatient_amt, tmc_rad_mri_count, tmc_rad_mri_amt,
             tmc_rad_ct_count, tmc_rad_ct_amt, tmc_rad_xray_count, tmc_rad_xray_amt, tmc_rad_usg_count, 
             tmc_rad_usg_amt, tmc_rad_update_user, tmc_rad_update_date, tmc_rad_company_slno
             FROM bis_tmc_radiology_master where tmc_rad_date between ? and ?
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


