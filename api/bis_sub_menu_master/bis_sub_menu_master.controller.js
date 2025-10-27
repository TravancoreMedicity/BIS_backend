const logger = require('../../logger/logger');

const { InsertSubMenuName, GetDatas, validateMenuNameExcistOrNot, UpdateSubMenuName } = require('./bis_sub_menu_master.service');

module.exports = {
    InsertSubMenuName: (req, res) => {
        const body = req.body;
        validateMenuNameExcistOrNot(body, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(200).json({
                    success: 0,
                    message: "Database connection error" + error,
                });
            }

            if (results?.length > 0) {
                return res.status(200).json({
                    success: 2,
                    message: "Menu Name already exist",
                });
            }
            InsertSubMenuName(body, (error, results) => {

                if (error) {
                    logger.error(error);
                    return res.status(200).json({
                        success: 0,
                        message: "Database connection error" + error,
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: "successfully Inserted",
                });
            });
        })
    },
    GetDatas: (req, res) => {
        GetDatas((error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            if (results?.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "no data",
                });
            }

            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
    UpdateSubMenuName: (req, res) => {
        const body = req.body;
        UpdateSubMenuName(body, (error, results) => {
            if (error) {
                logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }
            return res.status(200).json({
                success: 1,
                data: results,
            });
        });
    },
}