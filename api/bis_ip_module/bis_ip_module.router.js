const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { ipDetails } = require("./bis_ip_module.controller");

router.post('/ipDetails', verifyToken, ipDetails)
module.exports = router

