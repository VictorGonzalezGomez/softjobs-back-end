const { getUser } = require('../models/usersModel');
const { getJwtToken } = require("../helpers/createToken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    email.toLowerCase()
    try {
        const user = await getUser(email);
        if (user[0] === undefined) {
            res.status(404).send("USER IS NOT REGISTERED");
        } else {
            const isPasswordValid = await bcrypt.compare(password, user[0].password);
            if (!isPasswordValid) {
                res.status(401).send("INVALID PASSWORD");
            } else {
                const token = await getJwtToken(user[0]);
                res.status(200).send(token)
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message:"INTERNAL SERVER ERROR"});
    }
};

module.exports = { loginUser };