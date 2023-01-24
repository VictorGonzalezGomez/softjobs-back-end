const { createUser, getUser, getAllUsers } = require('../models/usersModel')
const jwt = require('jsonwebtoken');

const userRegister = async (req, res) => {
    try {
        const payload = req.body;
        console.log("payload",payload)
        const validateUser = await getAllUsers();
        console.log("validate user",validateUser);
        const userExists = validateUser.filter(user => user.email == payload.email);
        console.log("user exists length", userExists.length)

        if (userExists.length==0){
            console.log("PAYLOAD CONTROLLER",payload);
            const newUser = await createUser(payload);
            res.status(201).json(newUser);
        }
        res.status(400).send("ERROR USER ALREADY EXISTS");
    }catch (e) {
        console.log(e);
        res.status(500).json({ message:"ERROR REGISTERING USER"});
    }
}

const gettingUser = async  (req, res) =>{
    try {
        const token = req.header('Authorization').split(' ')[1];
        const { email } = jwt.decode(token);
        const user = await getUser(email);
        res.json(user[0]);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message:"ERROR CAN NOT GET USER"});
    }
}
module.exports = { userRegister , gettingUser};