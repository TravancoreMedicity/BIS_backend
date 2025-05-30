const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { getOpDatas, getOpModuleData, insertOpcount, updatOpCount, updateCashcreditCount, getIpModuleData, insertIpAdmissionDatas, updateDischargeCount } = require("./bis_data_push.controller");

//OP
router.get('/getOpDatas', verifyToken, getOpDatas)
router.get('/getOpModuleData', verifyToken, getOpModuleData)
router.post('/insertOpcount', verifyToken, insertOpcount)
router.patch('/updatOpCount', verifyToken, updatOpCount)
router.patch('/updateCashcredit', verifyToken, updateCashcreditCount)
//IP
router.get('/getIpModuleData', verifyToken, getIpModuleData)
router.post('/insertIpAdmission', insertIpAdmissionDatas);
router.patch('/updateDischargeCount', updateDischargeCount);
module.exports = router

