const express = require('express');
const router = express.Router();

const { userRegister, gettingUser} = require('../controllers/usersController');
const {isLogin} = require("../middlewares/isLogin");

router.post('/usuarios', userRegister);
router.get('/usuarios', isLogin, gettingUser);
router.get("*", (req,res) =>{
    res.status(404).send("ERROR 404 PAGE NOT FOUND");
})

module.exports = router