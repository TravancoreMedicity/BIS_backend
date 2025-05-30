const { pool } = require('../../config/database')
module.exports = {
    pharmacyDetails: (data, callBack) => {
        pool.query(
            `SELECT tmc_ph_slno, tmc_ph_transaction_date, tmc_ph_total_bill_count, tmc_ph_op_bill_count, tmc_ph_ip_bill_count,
             tmc_ph_total_gross, tmc_ph_op_gross, tmc_h_ip_gross, tmc_ph_total_return_count, tmc_ph_ip_return_count, 
             tmc_ph_op_return_count, tmc_ph_total_return_gross, tmc_ph_op_return_gross, tmc_ph_ip_rerurn_gross,
             tmc_ph_update_user, tmc_ph_update_date, tmc_ph_company_slno FROM bis_tmc_pharmacy
             where tmc_ph_transaction_date between ? and ?
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


