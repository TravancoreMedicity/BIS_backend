const { pool } = require('../../config/database')
module.exports = {
    opDetails: (data, callBack) => {
        pool.query(
            `SELECT tmc_op_slno, tmc_op_visit_date, tmc_op_total_op,
             tmc_op_new_reg, tmc_op_visit, tmc_op_registration_fee, tmc_op_visit_fee,
             tmc_op_collection_total, tmc_op_canel_count, tmc_op_canel_amount, tmc_op_update_user,
             tmc_op_update_date, tmc_op_company_slno
             FROM bis_tmc_outpatient_visit where tmc_op_visit_date between ? and ?
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


