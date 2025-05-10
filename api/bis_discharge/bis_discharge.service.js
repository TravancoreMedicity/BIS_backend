const { pool } = require('../../config/database')
module.exports = {
    dischargeDetails: (data, callBack) => {
        pool.query(
            `SELECT dc_slno, dc_date, dc_total_bill_count, dc_total_bill_amount, dc_advance_count,
             dc_advance_amount, dc_receipt_count, dc_receipt_amount, dc_update_user, dc_update_date 
             FROM bis_discharge where dc_date between ? and ?
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


