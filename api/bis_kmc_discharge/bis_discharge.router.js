const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { dischargeDetails } = require("./bis_discharge.controller");

router.post('/dischargeDetails', verifyToken, dischargeDetails)
module.exports = router