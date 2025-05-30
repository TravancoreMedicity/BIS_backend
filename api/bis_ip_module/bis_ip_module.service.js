const { pool } = require('../../config/database')
module.exports = {
    ipDetails: (data, callBack) => {
        pool.query(
            `SELECT tmc_ip_slno, tmc_ip_date, tmc_ip_total_admission, tmc_ip_total_discharge, tmc_ip_dama, tmc_ip_dis_gross, tmc_ip_dis_net, tmc_ip_receipt_count,
             tmc_ip_receipt_amount, tmc_ip_bill_insurance_count, tmc_ip_bill_cash_count, tmc_ip_bill_credit_card, tmc_ip_bill_cash, tmc_ip_update_user, tmc_ip_update_date, tmc_ip_company_slno
             FROM bis_tmc_inpatient where tmc_ip_date between ? and ?
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


