
const router = require('express').Router();
const { verifyToken } = require('../tokenValidation/tokenValidation');

const { createGroupRights, updateGraphicalViewRights, getGraphicalViewRights, getUsergrpRights } = require('./bisGraphicalViewMast.controller');

router.post("/", verifyToken, createGroupRights)
router.patch("/", verifyToken, updateGraphicalViewRights)
router.get("/fetchGraphicalviewRights/:loggedUser", verifyToken, getGraphicalViewRights);
router.get("/getUsergrpRights", verifyToken, getUsergrpRights);



module.exports = router