const { pool } = require('../../config/database')
module.exports = {

    inserQtnMasterTbl: (data, callback) => {
        pool.query(
            `INSERT INTO quotation_master(su_code, qtn_no, qtn_date, su_name, qtn_type, qtn_expiry, qtn_stcode, stc_desc, qtn_amount, qtn_validity,company_slno)
          VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.QUC_STCODE,
                data.qtnNo,
                data.qtnDate,
                data.SUC_NAME,
                data.QUC_TYPE,
                data.qtn_expiry,
                data.QUC_STCODE,
                data.STC_DESC,
                data.QUN_AMOUNT,
                data.validity,
                data.company_slno
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    InserQtnDetailTbl: (data, callBack) => {
        pool.query(
            `INSERT INTO quotation_details(
             qtn_no, it_code, itc_desc, qtn_rate, qtn_disper, qtn_disamt, tx_code, 
             txn_purper,txc_dec, qtn_qty,qtn_free_qty,qtn_mrp, qtn_netamt, qtn_net_unitrate, 
             qtn_taxamt,qtn_pack, qtn_strip, qtn_fretype)
             VALUES ?`,
            [
                data
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },

    checkInsertVal: (data, callBack) => {
        pool.query(
            `SELECT qtn_no,
            qtn_date
            FROM quotation_master
            WHERE qtn_no=? and qtn_date=? `,
            [
                data.qtnNo,
                data.qtnDate,
            ],
            (error, results, feilds) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            }
        )
    },
}

