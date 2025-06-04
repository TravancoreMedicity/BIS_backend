const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { inserQtnDetails } = require("./bis_quotation.controller");

router.post('/inserQtnDetails', verifyToken, inserQtnDetails)

module.exports = router

