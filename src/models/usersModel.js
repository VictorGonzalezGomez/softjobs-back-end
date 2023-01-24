const pool = require("../db/connectionDb").pool;
const bcrypt = require("bcryptjs");


const createUser = async (payload) => {
    const passwordEncrypted = bcrypt.hashSync(payload.password);
    const query = "INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [payload.email, passwordEncrypted, payload.rol, payload.lenguage];
    const result = await pool.query(query, values);
    const rowCount = result.rowCount;
    if (!rowCount)
        throw {
            code: 404,
            message: "USER COULD NOT BE CREATED",
        };
    return result.rows;
};

const getUser = async (email) => {
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const values = [email];
    const result = await pool.query(query, values);
    const rowCount = result.rowCount;

    if (!rowCount)
        throw {
            code: 404,
            message: "USER NOT FOUND",
        };
    return result.rows;
};

const getAllUsers = async () => {
    SQLquery = {
        text:"SELECT * FROM usuarios ORDER BY id DESC",
    };
    try {
        const result = await pool.query(SQLquery);
        return result.rows;
    }catch (e) {
        console.log(
            "ERROR WHEN OBTAINING DATA IN TABLE usuarios:",
            e.code,
            e.message);
        throw new Error(e)
    }
}
module.exports = { createUser, getUser, getAllUsers };