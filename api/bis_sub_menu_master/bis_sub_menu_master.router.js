const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { InsertSubMenuName, GetDatas, UpdateSubMenuName } = require('./bis_sub_menu_master.controller');

router.post('/insertSubMenuName', verifyToken, InsertSubMenuName)
router.get('/getdatas', verifyToken, GetDatas)
router.patch('/editSubMenuName', verifyToken, UpdateSubMenuName)

module.exports = router