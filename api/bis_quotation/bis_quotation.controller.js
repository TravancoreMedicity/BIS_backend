const { pool } = require('../../config/database')
const { inserQtnMasterTbl, InserQtnDetailTbl, checkInsertVal } = require('./bis_quotation.service');

module.exports = {

    inserQtnDetails: (req, res) => {
        const body = req.body;
        checkInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                inserQtnMasterTbl(body, (err, result) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    else {
                        const detailDatas = body?.detailData?.map(record => [
                            result.insertId,
                            record.IT_CODE,
                            record.ITC_DESC,
                            record.QUN_RATE,
                            record.QUN_DISPER,
                            record.QUN_DISAMT,
                            record.TX_CODE,
                            record.TXN_PURPER,
                            record.TXC_DESC,
                            record.QUN_QTY,
                            record.QUN_FREEQTY,
                            record.QUN_MRP,
                            record.QUN_NETAMT,
                            record.QUN_NETUNITRATE,
                            record.QUN_TAXAMT,
                            record.QUN_PACK,
                            record.QUN_STRIP,
                            record.QUC_FRETYPE

                        ]);
                        InserQtnDetailTbl(detailDatas, (err, result) => {
                            if (err) {
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            return res.status(200).json({
                                success: 1,
                                message: "Quotation Details inserted successfully"
                            })
                        })
                    }
                })
            } else {
                return res.status(200).json({
                    success: 7,
                    message: "Quotation Details Already Entered"
                })
            }
        })




    },

}

