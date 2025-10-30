const { pool } = require('../../config/database')
const { getOpDatas, getOpModuleData, insertOpcount, updatOutpatientModuleTbl, deleteOpData, updatOpCount, updateCashcreditCount, deleteOpCashCreditData, updateOpCashCreditData, getKmcIpModuleData, insertIpAdmissionDatas, updateDischargeCount, UpdateIpDischgModuleTbl, UpdateIpAdmsnModuleTbl, getKmcPharmaSalesModuleData
} = require('./bis_data_push.service');
module.exports = {

    getOpDatas: (req, res) => {

        getOpDatas((err, results) => {
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

    getOpModuleData: (req, res) => {
        getOpModuleData((err, results) => {
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

    insertOpcount: (req, res) => {
        const body = req.body;
        const values = body.map(record => [
            record.DATEE,
            record.TOTAL,
            record.NEW_REG,
            record.R_VISIT,
            record.c_name
        ]);

        insertOpcount(values, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error: " + error,
                });
            }

            if (results.affectedRows !== values.length) {
                return deleteOpData(dateArr, (err, deleteResult) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: "Delete error: " + err
                        });
                    }
                    if (deleteResult.affectedRows === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No record found to delete"
                        });
                    }
                    return res.status(200).json({
                        success: 0,
                        message: `Only ${results.affectedRows} out of ${trimmedValues.length} were inserted. Try Again.`
                    });
                });
            }
            const frmDate = body[0]?.tDate;
            updatOutpatientModuleTbl(frmDate, (err, updateResults) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (updateResults === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No record found to update"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data inserted and updated successfully"
                });
            });
        });
    },
    updatOpCount: (req, res) => {
        const body = req.body;
        const values = body.map(record => [
            record.DATEE,
            record.NEW_REG,
            record.c_name
        ]);
        const dateArr = body.map(record => record.DATEE);

        updatOpCount(values, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error: " + error,
                });
            }

            if (results.affectedRows !== values.length) {
                return deleteOpData(dateArr, (err, deleteResult) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: "Delete error: " + err
                        });
                    }
                    if (deleteResult.affectedRows === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No record found to delete"
                        });
                    }
                    return res.status(200).json({
                        success: 0,
                        message: `Only ${results.affectedRows} out of ${trimmedValues.length} were inserted. Try Again.`
                    });
                });
            }
            const frmDate = body[0]?.tDate;
            updatNewRegOpModule(frmDate, (err, updateResults) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    });
                }
                if (updateResults === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No record found to update"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "Data inserted and updated successfully"
                });
            });
        });
    },

    updateCashcreditCount: (req, res) => {
        const body = req.body;
        const values = body.map(record => [
            record.DATEE,
            record.N_REG,
            record.R_VST,
            record.TOTAL,
            record.REFUND,
            record.c_name
        ]);
        const dateArr = body.map(record => record.DATEE);

        updateCashcreditCount(values, (error, results) => {
            if (error) {
                return res.status(200).json({
                    success: 0,
                    message: "Database error: " + error,
                });
            }

            if (results.affectedRows !== values.length) {
                return deleteOpCashCreditData(dateArr, (err, deleteResult) => {
                    if (err) {
                        return res.status(200).json({
                            success: 0,
                            message: "Delete error: " + err
                        });
                    }
                    if (deleteResult.affectedRows === 0) {
                        return res.status(200).json({
                            success: 2,
                            message: "No records deleted"
                        });
                    }
                    return res.status(200).json({
                        success: 0,
                        message: `Only ${results.affectedRows} of ${values.length} updated. Rolled back.`
                    });
                });
            }

            const frmDate = body[0]?.tDate;
            updateOpCashCreditData(frmDate, (err, updateResults) => {
                if (err) {
                    return res.status(200).json({ success: 0, message: err });
                }
                if (updateResults === 0) {
                    return res.status(200).json({ success: 2, message: "No record found to update" });
                }
                return res.status(200).json({ success: 1, message: "Data inserted and updated successfully" });
            });
        });


    },

    ////////////IP
    getKmcIpModuleData: (req, res) => {
        getKmcIpModuleData((err, results) => {
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

    //INSERTION AND UPATION USING COMMIT AND ROLLBACK

    insertIpAdmissionDatas: (req, res) => {
        const body = req.body;

        const values = body.map(record => [
            record.ADM_DATE,
            record.ADM_COUNT,
            record.c_name
        ]);
        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to database: " + err
                });
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return res.status(500).json({
                        success: 0,
                        message: "Transaction start failed: " + err
                    });
                }

                insertIpAdmissionDatas(values, (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(500).json({
                                success: 0,
                                message: "Insert error: " + error
                            });
                        });
                    }

                    if (results.affectedRows !== values.length) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(200).json({
                                success: 0,
                                message: `Only ${results.affectedRows} out of ${values.length} were inserted. Rolling back.`
                            });
                        });
                    }
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return res.status(500).json({
                                    success: 0,
                                    message: "Commit failed: " + err
                                });
                            });
                        } else {

                            const frmDate = body[0]?.tDate;
                            UpdateIpAdmsnModuleTbl(frmDate, (err, updateResults) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return res.status(500).json({
                                            success: 0,
                                            message: "Insert error: " + error
                                        });
                                    });
                                }
                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.status(500).json({
                                                success: 0,
                                                message: "Commit failed: " + err
                                            });
                                        });
                                    } else {
                                        connection.release();
                                        return res.status(200).json({
                                            success: 1,
                                            message: "Admission data added successfully"
                                        });
                                    }

                                });
                            });
                        }
                    });
                });
            });
        });
    },

    /////////////


    updateDischargeCount: (req, res) => {
        const body = req.body;
        const values = body.map(record => [
            record.DIS_DATE,
            record.DIS_COUNT,
            record.c_name
        ]);
        // console.log(values);

        pool.getConnection((err, connection) => {
            if (err) {
                return res.status(500).json({
                    success: 0,
                    message: "Failed to connect to database: " + err
                });
            }

            connection.beginTransaction(err => {
                if (err) {
                    connection.release();
                    return res.status(500).json({
                        success: 0,
                        message: "Transaction start failed: " + err
                    });
                }

                updateDischargeCount(values, (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(500).json({
                                success: 0,
                                message: "Insert error: " + error
                            });
                        });
                    }

                    if (results.affectedRows !== values.length) {
                        return connection.rollback(() => {
                            connection.release();
                            return res.status(200).json({
                                success: 0,
                                message: `Only ${results.affectedRows} out of ${values.length} were inserted. Rolling back.`
                            });
                        });
                    }
                    connection.commit(err => {
                        if (err) {
                            return connection.rollback(() => {
                                connection.release();
                                return res.status(500).json({
                                    success: 0,
                                    message: "Commit failed: " + err
                                });
                            });
                        } else {
                            const frmDate = body[0]?.tDate;
                            UpdateIpDischgModuleTbl(frmDate, (err, updateResults) => {
                                if (err) {
                                    return connection.rollback(() => {
                                        connection.release();
                                        return res.status(500).json({
                                            success: 0,
                                            message: "Insert error: " + error
                                        });
                                    });
                                }
                                connection.commit(err => {
                                    if (err) {
                                        return connection.rollback(() => {
                                            connection.release();
                                            return res.status(500).json({
                                                success: 0,
                                                message: "Commit failed: " + err
                                            });
                                        });
                                    } else {
                                        connection.release();
                                        return res.status(200).json({
                                            success: 1,
                                            message: "Admission data added successfully"
                                        });
                                    }

                                });
                            });
                        }
                    });
                });
            });
        });
    },
    //pharma sales
    getKmcPharmaSalesModuleData: (req, res) => {
        getKmcPharmaSalesModuleData((err, results) => {
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

