const { pool } = require('../../config/database')
module.exports = {
    dischargeDetails: (data, callBack) => {
        pool.query(
            `
             SELECT tmc_dc_slno, tmc_dc_date, tmc_dc_total_bill_count, tmc_dc_total_bill_amount,
             tmc_dc_advance_count, tmc_dc_advance_amount, tmc_dc_receipt_count, tmc_dc_receipt_amount,
             tmc_dc_update_user, tmc_dc_update_date, tmc_dc_company_slno
             FROM bis_tmc_discharge where tmc_dc_date between ? and ?
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


