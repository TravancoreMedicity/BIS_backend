const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { labDetails } = require("./bis_lab.controller");

router.post('/getlabDetails', verifyToken, labDetails)
module.exports = router