const { createUser, getUser } = require('../models/usersModel')


const userRegister = async (req, res) => {
    try {
        const payload = req.body;
        const userExists = await getUser(payload.email);
        if (userExists.length==0){
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
        const email  = req.user.email;
        const user = await getUser(email);
        res.json(user[0]);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message:"ERROR CAN NOT GET USER"});
    }
}
module.exports = { userRegister , gettingUser};