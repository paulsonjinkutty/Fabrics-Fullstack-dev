
const pool = require("../db/database");

const getPayments = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM payments");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getPaymentById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM payments WHERE id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getPayments,
    getPaymentById
};