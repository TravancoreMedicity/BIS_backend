const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { getDetails } = require("./bis_radiology.controller");

router.post('/getDetails', verifyToken, getDetails)
module.exports = router