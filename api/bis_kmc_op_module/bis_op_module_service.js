const { pool } = require('../../config/database')
module.exports = {
    opDetails: (data, callBack) => {
        pool.query(
            `SELECT kmc_op_slno, kmc_op_visit_date, kmc_op_total_op,
             kmc_op_new_reg, kmc_op_visit, kmc_op_registration_fee, kmc_op_visit_fee,
             kmc_op_collection_total, kmc_op_canel_count, kmc_op_canel_amount, kmc_op_update_user,
             kmc_op_update_date, kmc_op_company_slno
             FROM bis_kmc_outpatient_visit where kmc_op_visit_date between ? and ?
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


