const { pool } = require('../../config/database')
module.exports = {
    ipDetails: (data, callBack) => {
        pool.query(
            `SELECT ip_slno, ip_date, ip_total_admission, ip_total_discharge, ip_dama, ip_dis_gross, ip_dis_net, ip_receipt_count, ip_receipt_amount,
             ip_bill_insurance_count, ip_bill_cash_count, ip_bill_credit_card, ip_bill_cash, ip_update_user, ip_update_date 
             FROM bis_inpatient where ip_date between ? and ?
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


