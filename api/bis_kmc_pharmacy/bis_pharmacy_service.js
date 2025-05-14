const { pool } = require('../../config/database')
module.exports = {
    pharmacyDetails: (data, callBack) => {
        pool.query(
            `SELECT kmc_ph_slno, kmc_ph_transaction_date, kmc_ph_total_bill_count, kmc_ph_op_bill_count, kmc_ph_ip_bill_count,
             kmc_ph_total_gross, kmc_ph_op_gross, kmc_h_ip_gross, kmc_ph_total_return_count, kmc_ph_ip_return_count, 
             kmc_ph_op_return_count, kmc_ph_total_return_gross, kmc_ph_op_return_gross, kmc_ph_ip_rerurn_gross,
             kmc_ph_update_user, kmc_ph_update_date, kmc_ph_company_slno FROM bis_kmc_pharmacy
             where kmc_ph_transaction_date between ? and ?
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


