const logger = require('../../logger/logger');

const { validateGroupRights, getSubMenuSlno, insertGraphicalViewRight, getGroupSubMenuRigths, updateGraphicalViewRights, getGraphicalViewRights, getUsergrpRights } = require('./bisGraphicalViewMast.service');

module.exports = {

    createGroupRights: (req, res) => {

        const body = req.body;
        const body_result = body;

        if (body_result.error) {
            return res.status(200).json({
                success: 2,
                message: body_result.error.details[0].message
            });
        }

        validateGroupRights(body, (err, results) => {

            const value = JSON.parse(JSON.stringify(results))

            if (Object.keys(value).length === 0) {

                // Insert the values
                getSubMenuSlno(body, (err, results) => {
                    const postData = {
                        emp_no: body.emp_no,
                        menu_slno: body.menu_slno
                    }

                    if (err) {
                        logger.errorLogger(err)

                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    const subMenuSLno = JSON.parse(JSON.stringify(results))

                    const menuDetl = subMenuSLno.map((val) => {
                        const newArray = [body.emp_no, val.bis_mod_slno, body.menu_slno, val.bis_sub_menu_slno,]
                        return newArray;
                    })

                    insertGraphicalViewRight(menuDetl, (err, results) => {
                        if (err) {
                            // logger.errorLogger(err)
                            return res.status(200).json({
                                success: 0,
                                message: err
                            });
                        }

                        if (results) {

                            getGroupSubMenuRigths(body, (err, results) => {

                                if (err) {
                                    logger.errorLogger(err)
                                    return res.status(200).json({
                                        success: 0,
                                        message: err
                                    });
                                }

                                if (!results) {
                                    return res.status(200).json({
                                        success: 0,
                                        message: "No Data Found"
                                    });
                                }

                                return res.status(200).json({
                                    success: 1,
                                    data: results,
                                    message: "Updated Successfully"
                                });
                            })
                        }
                    });

                })

            } else {

                //Get The Selected Values
                getSubMenuSlno(body, (err, results) => {


                    //         SELECT bis_sub_menu_slno, bis_mod_slno
                    // FROM bis_sub_menu_master 
                    // WHERE bis_menu_slno = ?


                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }
                    const menuSLno = JSON.parse(JSON.stringify(results))

                    let array = menuSLno?.filter((row) => {
                        return !value?.find((val) => {


                            //             SELECT  view_mast_slno, view_emp_no, view_module_slno, view_menu_slno, view_sub_menu_slno, sub_menu_view_rights
                            // FROM bis_graphicalview_master 
                            // WHERE view_emp_no = ? AND view_menu_slno =?



                            return row.bis_sub_menu_slno === val.view_sub_menu_slno;
                        })
                    })
                    if (Object.keys(array).length === 0) {
                        getGroupSubMenuRigths(body, (err, results) => {

                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }

                            if (!results) {
                                return res.status(200).json({
                                    success: 0,
                                    message: "No Data Found"
                                });
                            }

                            return res.status(200).json({
                                success: 1,
                                data: results,
                                message: "Updated Successfully"
                            });
                        })

                    } else {
                        const menuDetl = array.map((val) => {
                            const newArray = [body.emp_no, val.bis_mod_slno, body.menu_slno, val.bis_sub_menu_slno,]
                            return newArray;
                        })

                        insertGraphicalViewRight(menuDetl, (err, results) => {
                            if (err) {
                                logger.errorLogger(err)
                                return res.status(200).json({
                                    success: 0,
                                    message: err
                                });
                            }
                            if (results) {

                                getGroupSubMenuRigths(body, (err, results) => {

                                    if (err) {
                                        logger.errorLogger(err)
                                        return res.status(200).json({
                                            success: 0,
                                            message: err
                                        });
                                    }

                                    if (!results) {
                                        return res.status(200).json({
                                            success: 0,
                                            message: "No Data Found"
                                        });
                                    }

                                    return res.status(200).json({
                                        success: 1,
                                        data: results,
                                        message: "Updated Successfully"
                                    });
                                })
                            }
                        });
                    }
                })
            }
        })
    },


    updateGraphicalViewRights: (req, res) => {
        const body = req.body

        updateGraphicalViewRights(body, (err, results) => {
            if (err) {
                logger.errorLogger(err)
                return res.status(200).json({
                    success: 0,
                    message: err
                });
            }

            if (!results) {
                return res.status(200).json({
                    success: 0,
                    message: "No Data Found"
                });
            }
            if (results) {

                getGroupSubMenuRigths(body, (err, results) => {

                    if (err) {
                        logger.errorLogger(err)
                        return res.status(200).json({
                            success: 0,
                            message: err
                        });
                    }

                    if (!results) {
                        return res.status(200).json({
                            success: 0,
                            message: "No Data Found"
                        });
                    }

                    return res.status(200).json({
                        success: 1,
                        message: "Updated Successfully",
                        data: results
                    });
                })
            }
        })
    },

    getGraphicalViewRights: (req, res) => {
        const id = req.params.loggedUser;
        // console.log(" req.params.", req.params);

        getGraphicalViewRights(id, (error, results) => {
            if (error) {

                // logger.error(error);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error",
                });
            }

            // Ensure results is an array before checking length
            if (!Array.isArray(results) || results.length === 0) {
                return res.status(200).json({
                    success: 2,
                    message: "No data",
                });
            }

            return res.status(200).json({
                success: 2,
                data: results,
            });
        });
    },

    getUsergrpRights: (req, res) => {
        getUsergrpRights((error, results) => {
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
}
