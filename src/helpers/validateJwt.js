const jwt = require('jsonwebtoken')

const validateToken = async (tokenLocal, res) => {
    try {
        const validate = await jwt.verify(
            tokenLocal,
            process.env.JWT_SECRET,
            (err, payload) => {
                if (err) {
                    throw new Error('INVALID TOKEN', err)
                }
                return payload
            },
        )
        return validate
    } catch (e) {
        console.log(e);
        res.status(500).json({ message:"INTERNAL SERVER ERROR"});
    }
}

module.exports = { validateToken }