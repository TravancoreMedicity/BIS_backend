const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { pharmacyDetails } = require("./bis_pharmacy.controller");

router.post('/pharmacyDetails', verifyToken, pharmacyDetails)
module.exports = router