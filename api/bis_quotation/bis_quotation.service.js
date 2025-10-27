const { pool } = require('../../config/database')
module.exports = {

    inserQtnMasterTbl: (data, callback) => {
        pool.query(
            `INSERT INTO bis_kmc_quotation_master(su_code, qtn_no, qtn_date, su_name, qtn_type, qtn_expiry, qtn_stcode, stc_desc, qtn_amount, qtn_validity,company_slno)
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

    inserTmcQtnMasterTbl: (data, callback) => {
        pool.query(
            `INSERT INTO bis_tmc_quotation_master(su_code, qtn_no, qtn_date, su_name, qtn_type, qtn_expiry, qtn_stcode, stc_desc, qtn_amount, qtn_validity,company_slno)
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
            `INSERT INTO bis_kmc_quotation_details(
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

    InserTmcQtnDetailTbl: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_tmc_quotation_details(
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
            FROM bis_kmc_quotation_master
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


    checTmcInsertVal: (data, callBack) => {
        pool.query(
            `SELECT qtn_no,
            qtn_date
            FROM bis_tmc_quotation_master
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
    insertStoreDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_kmc_store_master(
             st_code, stc_desc, stc_alias)
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
    checkstoreMastVal: (storeCodes, callBack) => {
        pool.query(
            `SELECT st_code, stc_desc
         FROM bis_kmc_store_master
         WHERE st_code IN (?)`,
            [storeCodes],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    //tmc
    insertTmcStoreDetails: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_tmc_store_master(
             st_code, stc_desc, stc_alias)
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
    checkstoreTmcMastVal: (storeCodes, callBack) => {
        pool.query(
            `SELECT st_code, stc_desc
         FROM bis_tmc_store_master
         WHERE st_code IN (?)`,
            [storeCodes],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },


    getKmcStoreData: (callback) => {
        pool.query(
            `SELECT st_slno, st_code, stc_desc, stc_alias FROM bis_kmc_store_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    getTmcStoreData: (callback) => {
        pool.query(
            `SELECT st_slno, st_code, stc_desc, stc_alias FROM bis_tmc_store_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    insertMedStore: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_kmc_med_store(
             it_code, st_code)
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
    CheckMedStore: (storeCodes, callBack) => {
        pool.query(
            `SELECT st_code, st_code
         FROM bis_kmc_med_store
         WHERE st_code IN (?)`,
            [storeCodes],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    insertMedDec: (data, callBack) => {
        pool.query(
            `INSERT INTO bis_kmc_med_desc_mast(
            it_code, itc_desc, itc_alias, itn_strip, mc_code, mcc_desc,
            mg_code, mgc_desc, cmc_desc, mtc_desc, itc_medicine, itc_consumable, itc_highvalue, itc_highrisk,
            itc_hazardous, itc_ved, itc_breakable, itn_breakqty, itn_lprate, itn_mrp, itn_originalmrp,itn_gendisper, itn_genipdisper,create_date,edit_date)
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
    CheckMedDec: (storeCodes, callBack) => {
        pool.query(
            `
         SELECT it_code, itc_desc
         FROM bis_med_desc_mast
         WHERE it_code IN (?)`,
            [storeCodes],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteMedStoreTable: (callBack) => {
        pool.query(
            ` DELETE FROM bis_med_store`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getMedStoreData: (callback) => {
        pool.query(
            `SELECT med_slno, it_code, st_code FROM bis.bis_med_store`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    // SELECT it_code, st_code, update_date FROM bis.bis_medstore_log;
    InsertExistDataToLog: (LogInserData, callBack) => {

        pool.query(
            `INSERT INTO bis_medstore_log(it_code, st_code) VALUES ?`,
            [
                LogInserData
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error)
                }
                return callBack(null, results)
            })
    },
    getKMCLinkedItems: (callback) => {
        pool.query(
            `SELECT bis_kmc_quotation_master.su_code,bis_kmc_quotation_details.it_code ,bis_kmc_quotation_details.itc_desc,
             bis_kmc_quotation_details.update_date,count(bis_kmc_quotation_details.it_code) as item_count
             FROM bis.bis_kmc_quotation_master
             left join bis_kmc_quotation_details ON bis_kmc_quotation_details.qtn_no =bis_kmc_quotation_master.qtn_slno 
             group by su_code`, [],
            // `
            //  SELECT bis_kmc_med_store.it_code,count(bis_kmc_med_store.it_code) as item_count,bis_kmc_med_store.st_code ,bis_kmc_med_desc_mast.create_date
            // FROM bis.bis_kmc_med_store
            // LEFT JOIN bis_kmc_med_desc_mast ON bis_kmc_med_desc_mast.it_code=bis_kmc_med_store.it_code
            // group by st_code`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    getTMCLinkedItems: (callback) => {
        pool.query(
            `SELECT bis_tmc_quotation_master.su_code,bis_tmc_quotation_details.it_code ,bis_tmc_quotation_details.itc_desc,
             bis_tmc_quotation_details.update_date,count(bis_tmc_quotation_details.it_code) as item_count
             FROM bis.bis_tmc_quotation_master
             left join bis_tmc_quotation_details ON bis_tmc_quotation_details.qtn_no =bis_tmc_quotation_master.qtn_slno 
             group by su_code`, [],

            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },

    KMCFinalizedQtn: (callback) => {
        pool.query(
            `SELECT * FROM bis_kmc_quotation_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
    TMCFinalizedQtn: (callback) => {
        pool.query(
            `SELECT * FROM bis_tmc_quotation_master`, [],
            (error, results, feilds) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);

            }
        );
    },
}



