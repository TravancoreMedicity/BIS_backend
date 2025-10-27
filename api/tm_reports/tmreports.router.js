const router = require("express").Router();
const { checkToken } = require("../../authentication/token_validation");
const { EmpTaskSearch, DeptSearch, fetchUserDrawer } = require('../tm_reports/tmreports.controller');

router.post('/searchDeptAndSec', checkToken, DeptSearch)
router.post('/searchEmployeTask', checkToken, EmpTaskSearch)
router.get('/getUserDrawer/:id', fetchUserDrawer);


module.exports = router