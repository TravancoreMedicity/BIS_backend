const { pool } = require('../../config/database')
module.exports = {
    opDetails: (data, callBack) => {
        pool.query(
            `SELECT op_slno, op_visit_date, op_total_op, op_new_reg, op_visit, op_registration_fee, op_visit_fee,
             op_collection_total, op_canel_count, op_canel_amount, op_update_user, op_update_date
             FROM bis_outpatient_visit where op_visit_date between ? and ?
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


