const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { getOpDatas, getOpModuleData, getOpOracleData, insertOpcount } = require("./bis_data_push.controller");

router.get('/getOpDatas', verifyToken, getOpDatas)
router.get('/getOpModuleData', verifyToken, getOpModuleData)
router.post('/getOpOracleData', verifyToken, getOpOracleData)
router.post('/insertOpcount', verifyToken, insertOpcount)
// router.patch('/updatOpCount', verifyToken, updatOpCount)

module.exports = router

