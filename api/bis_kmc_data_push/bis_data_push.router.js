const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { getOpDatas, getOpModuleData, getOpOracleData, insertOpcount, updatOpCount, updateCashcreditCount } = require("./bis_data_push.controller");

router.get('/getOpDatas', verifyToken, getOpDatas)
router.get('/getOpModuleData', verifyToken, getOpModuleData)
router.post('/getOpOracleData', verifyToken, getOpOracleData)
router.post('/insertOpcount', verifyToken, insertOpcount)
router.patch('/updatOpCount', verifyToken, updatOpCount)
router.patch('/updateCashcredit', verifyToken, updateCashcreditCount)
module.exports = router

