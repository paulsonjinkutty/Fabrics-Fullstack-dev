const pool = require("../db/database");

const getOrders = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};

const getOrderById = async (req, res) => {
    try {
        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM orders WHERE id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};

module.exports = {
    getOrders,
    getOrderById
};