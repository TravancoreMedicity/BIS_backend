const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { opDetails } = require("./bis_op_module.controller");

router.post('/opDetails', verifyToken, opDetails)
module.exports = router
