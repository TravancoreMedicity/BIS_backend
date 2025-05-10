const { getOpDatas, getOpModuleData, getOpOracleData, insertOpcount, updatOutpatientModuleTbl, deleteOpData, updatOpCount } = require('./bis_data_push.service');
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
    getOpOracleData: (req, res) => {
        const body = req.body
        getOpOracleData(body, (err, results) => {
            if (err) {
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No Results Found"
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
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

}

