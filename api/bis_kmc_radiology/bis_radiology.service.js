const { pool } = require('../../config/database')
module.exports = {
    getDetails: (data, callBack) => {
        pool.query(
            `SELECT kmc_rad_slno, kmc_rad_date, kmc_rad_total_count, kmc_rad_op_total_count,
             kmc_rad_ip_total_count, kmc_rad_refund_count, kmc_rad_op_total_amt, kmc_rad_ip_total_amt, 
             kmc_rad_refund_amt, kmc_rad_op_refund_amt, kmc_rad_ip_refund_amt, kmc_rad_total_cash_amt, 
             kmc_rad_total_credit_amt, kmc_rad_total_inpatient_amt, kmc_rad_mri_count, kmc_rad_mri_amt,
             kmc_rad_ct_count, kmc_rad_ct_amt, kmc_rad_xray_count, kmc_rad_xray_amt, kmc_rad_usg_count, 
             kmc_rad_usg_amt, kmc_rad_update_user, kmc_rad_update_date, kmc_rad_company_slno
             FROM bis_kmc_radiology_master where kmc_rad_date between ? and ?
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


