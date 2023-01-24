const { validateToken } = require('../helpers/validateJwt');


const isLogin = async (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(401).send({ message: 'PLEASE LOGIN' });
        }
        const token = req.header('Authorization').split(' ')[1];
        const tokenData = await validateToken(token, res);
        if (!tokenData) {
            return res.status(401).send({ message: 'INVALID TOKEN' });
        }
        req.user = tokenData;
        next();
    } catch (e) {
        console.log(e);
        res.status(500).json({ message:"INTERNAL SERVER ERROR"});
    }
};

module.exports = { isLogin };