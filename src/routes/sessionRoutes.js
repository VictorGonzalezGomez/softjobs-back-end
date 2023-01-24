const express = require('express');
const router = express.Router();
const { loginUser } = require('../controllers/sessionController');

router.post('/login', loginUser);
router.get("*", (req,res) =>{
    res.status(404).send("ERROR 404 PAGE NOT FOUND");
})
module.exports = router;