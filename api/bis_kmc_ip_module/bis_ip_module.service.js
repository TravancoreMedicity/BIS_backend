const { pool } = require('../../config/database')
module.exports = {
    ipDetails: (data, callBack) => {
        pool.query(
            `SELECT kmc_ip_slno, kmc_ip_date, kmc_ip_total_admission, kmc_ip_total_discharge, kmc_ip_dama, kmc_ip_dis_gross, kmc_ip_dis_net, kmc_ip_receipt_count,
             kmc_ip_receipt_amount, kmc_ip_bill_insurance_count, kmc_ip_bill_cash_count, kmc_ip_bill_credit_card, kmc_ip_bill_cash, kmc_ip_update_user, kmc_ip_update_date, kmc_ip_company_slno
             FROM bis_kmc_inpatient where kmc_ip_date between ? and ?
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


