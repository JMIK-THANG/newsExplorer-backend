const express= require('express')
const router = express.Router()
const{signin,signup} = require('../controllers/users.js')
const { getCurrentUser} = require("../controllers/users");
const { auth } = require("../middlewares/auth");

router.get("/me", auth, getCurrentUser);
router.post('/signup',signup);
router.post('/signin',signin);
module.exports = router;
