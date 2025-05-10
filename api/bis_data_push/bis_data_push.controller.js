const { getOpDatas, getOpModuleData, getOpOracleData, insertOpcount, updatOutpatientModuleTbl } = require('./bis_data_push.service');
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
                    message: "Database connection error" + error,
                });
            }

            if (results.affectedRows !== values.length) {
                return connection.rollback(() => {
                    connection.release();
                    return res.status(200).json({
                        success: 0,
                        message: `Only ${results.affectedRows} out of ${values.length} records were inserted. Transaction rolled back.`
                    });
                });
            }
            const frmDate = body[0]?.tDate;
            updatOutpatientModuleTbl(frmDate, (err, results) => {
                if (err) {
                    return res.status(200).json({
                        success: 0,
                        message: err
                    })
                }
                if (results === 0) {
                    return res.status(200).json({
                        success: 2,
                        message: "No record found"

                    })
                }
                return res.status(200).json({
                    success: 1,
                    message: "data Updated successfully"
                })
            })
            // return res.status(200).json({
            //     success: 1,
            //     message: "successfully Inserted",
            // });
        });
    },

    // updatOpCount: (req, res) => {
    //     const body = req.body;
    //     updatOpCount(body, (err, results) => {
    //         if (err) {
    //             return res.status(200).json({
    //                 success: 0,
    //                 message: err
    //             })
    //         }
    //         if (results === 0) {
    //             return res.status(200).json({
    //                 success: 1,
    //                 message: "No record found"

    //             })
    //         }
    //         return res.status(200).json({
    //             success: 2,
    //             message: "data Updated successfully"
    //         })
    //     })
    // },

}

