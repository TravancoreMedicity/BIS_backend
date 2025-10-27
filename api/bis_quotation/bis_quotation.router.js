const router = require("express").Router();
const { verifyToken } = require("../tokenValidation/tokenValidation");
const { inserQtnDetails, inserTmcQtnDetails, insertStoreDetails, getKmcStoreData, getTmcStoreData, insertMedStore, insertMedDec, insertTmcStoreDetails, getKMCLinkedItems, KMCFinalizedQtn, getTMCLinkedItems, TMCFinalizedQtn } = require("./bis_quotation.controller");

router.post('/inserQtnDetails', verifyToken, inserQtnDetails)
router.post('/inserTmcQtnDetails', verifyToken, inserTmcQtnDetails)
router.post('/insertKmcStoreDetails', verifyToken, insertStoreDetails)
router.post('/insertTmcStoreDetails', verifyToken, insertTmcStoreDetails)
router.get('/getKmcStoreData', verifyToken, getKmcStoreData)
router.get('/getTmcStoreData', verifyToken, getTmcStoreData)
router.post('/insertMedStore', verifyToken, insertMedStore)
router.post('/insertMedDec', verifyToken, insertMedDec)
router.get('/getKMCLinkedItems', verifyToken, getKMCLinkedItems)
router.get('/KMCFinalizedQtn', verifyToken, KMCFinalizedQtn)
router.get('/getTMCLinkedItems', verifyToken, getTMCLinkedItems)
router.get('/TMCFinalizedQtn', verifyToken, TMCFinalizedQtn)

module.exports = router

