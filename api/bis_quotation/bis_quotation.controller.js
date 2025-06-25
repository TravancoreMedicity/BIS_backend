const { pool } = require('../../config/database')
const { inserQtnMasterTbl, InserQtnDetailTbl, checkInsertVal, insertStoreDetails, checkstoreMastVal, getKmcStoreData, getTmcStoreData, insertMedStore, CheckMedStore, insertMedDec, CheckMedDec, deleteMedStoreTable, getMedStoreData, InsertExistDataToLog, insertTmcStoreDetails, checkstoreTmcMastVal, checTmcInsertVal, inserTmcQtnMasterTbl, InserTmcQtnDetailTbl, getKMCLinkedItems, KMCFinalizedQtn, getTMCLinkedItems, TMCFinalizedQtn } = require('./bis_quotation.service');

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

    inserTmcQtnDetails: (req, res) => {
        const body = req.body;
        checTmcInsertVal(body, (err, results) => {
            const value = JSON.parse(JSON.stringify(results))
            if (Object.keys(value).length === 0) {
                inserTmcQtnMasterTbl(body, (err, result) => {
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
                        InserTmcQtnDetailTbl(detailDatas, (err, result) => {
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



    insertStoreDetails: (req, res) => {
        const body = req.body;

        const storeDataFull = body?.map(record => ({
            ST_CODE: record.ST_CODE,
            STC_DESC: record.STC_DESC,
            STC_ALIAS: record.STC_ALIAS,
        }));

        const storeCodes = storeDataFull.map(record => record.ST_CODE);

        // Check existing stores
        checkstoreMastVal(storeCodes, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Error while checking existing store records",
                    error: err
                });
            }

            const existingStores = JSON.parse(JSON.stringify(results));
            const existingStoreCodes = existingStores.map(store => store.st_code);

            // Filter only new stores (not in existingStoreCodes)
            const newStores = storeDataFull.filter(store => !existingStoreCodes.includes(store.ST_CODE));

            if (newStores.length === 0) {
                // Nothing new to insert
                return res.status(200).json({
                    success: 7,
                    message: "All Store Details Already Entered",
                    insertedStores: [],
                    skippedStores: existingStoreCodes
                });
            }

            // Prepare newStores as array of arrays for INSERT
            const storeDataToInsert = newStores.map(store => [
                store.ST_CODE,
                store.STC_DESC,
                store.STC_ALIAS
            ]);

            // Insert only new stores
            insertStoreDetails(storeDataToInsert, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error while inserting new store details",
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "New Store Master Details Added successfully",
                        insertedStores: newStores.map(store => store.ST_CODE),
                        skippedStores: existingStoreCodes
                    });
                }
            });
        });
    },

    insertTmcStoreDetails: (req, res) => {
        const body = req.body;

        const storeDataFull = body?.map(record => ({
            ST_CODE: record.ST_CODE,
            STC_DESC: record.STC_DESC,
            STC_ALIAS: record.STC_ALIAS,
        }));

        const storeCodes = storeDataFull.map(record => record.ST_CODE);

        // Check existing stores
        checkstoreTmcMastVal(storeCodes, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Error while checking existing store records",
                    error: err
                });
            }

            const existingStores = JSON.parse(JSON.stringify(results));
            const existingStoreCodes = existingStores.map(store => store.st_code);

            // Filter only new stores (not in existingStoreCodes)
            const newStores = storeDataFull.filter(store => !existingStoreCodes.includes(store.ST_CODE));

            if (newStores.length === 0) {
                // Nothing new to insert
                return res.status(200).json({
                    success: 7,
                    message: "All Store Details Already Entered",
                    insertedStores: [],
                    skippedStores: existingStoreCodes
                });
            }

            // Prepare newStores as array of arrays for INSERT
            const storeDataToInsert = newStores.map(store => [
                store.ST_CODE,
                store.STC_DESC,
                store.STC_ALIAS
            ]);

            // Insert only new stores
            insertTmcStoreDetails(storeDataToInsert, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error while inserting new store details",
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "New Store Master Details Added successfully",
                        insertedStores: newStores.map(store => store.ST_CODE),
                        skippedStores: existingStoreCodes
                    });
                }
            });
        });
    },
    getKmcStoreData: (req, res) => {
        getKmcStoreData((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    getTmcStoreData: (req, res) => {
        getTmcStoreData((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    insertMedStore: (req, res) => {
        const body = req.body;
        const storeDataFull = body?.map(record => ({
            IT_CODE: record.IT_CODE,
            ST_CODE: record.ST_CODE,
        }));

        const storeCodes = storeDataFull.map(record => record.ST_CODE);

        // Check existing stores
        CheckMedStore(storeCodes, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Error while checking existing store records",
                    error: err
                });
            }

            const existingStores = JSON.parse(JSON.stringify(results));
            const existingStoreCodes = existingStores.map(store => store.st_code);

            // Filter only new stores (not in existingStoreCodes)
            const newStores = storeDataFull.filter(store => !existingStoreCodes.includes(store.ST_CODE));

            if (newStores.length === 0) {
                // Nothing new to insert
                return res.status(200).json({
                    success: 7,
                    message: "All Store Details Already Entered",
                    insertedStores: [],
                    skippedStores: existingStoreCodes
                });
            }

            // Prepare newStores as array of arrays for INSERT
            const storeDataToInsert = newStores.map(store => [
                store.IT_CODE,
                store.ST_CODE,
            ]);
            // Insert only new stores
            insertMedStore(storeDataToInsert, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: 0,
                        message: "Error while inserting new store details",
                        error: err
                    });
                } else {
                    return res.status(200).json({
                        success: 1,
                        message: "New Store Master Details Added successfully",
                        insertedStores: newStores.map(store => store.ST_CODE),
                        skippedStores: existingStoreCodes
                    });
                }
            });
        });
    },

    insertMedDec: (req, res) => {
        const body = req.body;

        if (!Array.isArray(body) || body.length === 0) {
            return res.status(400).json({
                success: 0,
                message: "Invalid or empty payload"
            });
        }

        const storeCodes = body?.map(record => record.IT_CODE);

        // Step 1: Check existing records
        CheckMedDec(storeCodes, (err, results) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Error while checking existing records",
                    error: err
                });
            }

            const existing = JSON.parse(JSON.stringify(results));
            const existingCodes = existing.map(item => item.it_code);
            const newRecords = body.filter(record => !existingCodes.includes(record.IT_CODE));

            if (newRecords.length === 0) {
                return res.status(200).json({
                    success: 7,
                    message: "All Medicine Description Details Already Exist",
                    inserted: [],
                    skipped: existingCodes
                });
            }

            // Step 2: Prepare new data for insertion
            const storeDataToInsert = newRecords.map(store => [
                store.IT_CODE,
                store.ITC_DESC,
                store.ITC_ALIAS,
                store.ITN_STRIP,
                store.MC_CODE,
                store.MCC_DESC,
                store.MG_CODE,
                store.MGC_DESC,
                store.CMC_DESC,
                store.MTC_DESC,
                store.MEDICINE,
                store.CONSUMABLE,
                store.HIGH_VALUE,
                store.HIGH_RISK,
                store.HAZARDOUS,
                store.VED,
                store.BREAKABLE,
                store.ITN_BREAKQTY,
                store.ITN_LPRATE,
                store.ITN_MRP,
                store.ITN_ORIGINALMRP,
                store.ITN_GENDISPER,
                store.ITN_GENIPDISPER,
                store.ITD_DATE,
                store.ITD_EDDATE
            ]);

            // Step 3: If no existing records, backup and delete old data, then insert
            if (existingCodes.length === 0) {
                getMedStoreData((err, results) => {
                    if (err) {
                        return res.status(500).json({
                            success: 0,
                            message: "Error while fetching existing store data",
                            error: err
                        });
                    }

                    if (!results || results.length === 0) {
                        return res.status(200).json({
                            success: 1,
                            message: "No Med Store Records",
                            data: []
                        });
                    }

                    const LogInsertData = results.map(item => [
                        item.it_code,
                        item.it_code // You may want to change the second item if needed (e.g., backup reason or timestamp)
                    ]);

                    InsertExistDataToLog(LogInsertData, (insertErr, result) => {
                        if (insertErr) {
                            return res.status(500).json({
                                success: 0,
                                message: "Error while inserting backup MedStore data",
                                error: insertErr
                            });
                        }

                        deleteMedStoreTable((deleteErr) => {
                            if (deleteErr) {
                                return res.status(500).json({
                                    success: 0,
                                    message: "Error while deleting existing MedStore table data",
                                    error: deleteErr
                                });
                            }

                            insertMedDec(storeDataToInsert, (insertErr, result) => {
                                if (insertErr) {
                                    return res.status(500).json({
                                        success: 0,
                                        message: "Error while inserting new records",
                                        error: insertErr
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    message: "Table cleared and new Medicine Description Records added successfully",
                                    insertedCount: newRecords.length
                                });
                            });
                        });
                    });
                });
            } else {
                return res.status(200).json({
                    success: 0,
                    message: "Some Medicine Description records already exist. No deletion performed.",
                    skipped: existingCodes
                });
            }
        });
    },
    getKMCLinkedItems: (req, res) => {
        getKMCLinkedItems((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    getTMCLinkedItems: (req, res) => {
        getTMCLinkedItems((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },

    KMCFinalizedQtn: (req, res) => {
        KMCFinalizedQtn((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
    TMCFinalizedQtn: (req, res) => {
        TMCFinalizedQtn((err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                })
            }
            if (results === 0) {
                return res.status(200).json({
                    success: 1,
                    message: "No Records",
                    data: []
                })
            }
            return res.status(200).json({
                success: 2,
                data: results
            })

        })
    },
}


