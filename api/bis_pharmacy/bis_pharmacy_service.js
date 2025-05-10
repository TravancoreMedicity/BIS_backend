const { pool } = require('../../config/database')
module.exports = {
    pharmacyDetails: (data, callBack) => {
        pool.query(
            `SELECT ph_slno, ph_transaction_date, ph_total_bill_count, ph_op_bill_count, ph_ip_bill_count, 
             ph_total_gross, ph_op_gross, ph_ip_gross, ph_total_return_count, ph_ip_return_count, ph_op_return_count,
             ph_total_return_gross, ph_op_return_gross, ph_ip_rerurn_gross, ph_update_user, ph_update_date FROM meliora.bis_pharmacy
             where ph_transaction_date between ? and ?
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


