const { pool } = require('../../config/database')
module.exports = {
    dischargeDetails: (data, callBack) => {
        pool.query(
            `
             SELECT kmc_dc_slno, kmc_dc_date, kmc_dc_total_bill_count, kmc_dc_total_bill_amount,
             kmc_dc_advance_count, kmc_dc_advance_amount, kmc_dc_receipt_count, kmc_dc_receipt_amount,
             kmc_dc_update_user, kmc_dc_update_date, kmc_dc_company_slno
             FROM bis_kmc_discharge where kmc_dc_date between ? and ?
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


