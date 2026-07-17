
const pool = require("../db/database");

const getCustomers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM customer");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getCustomerById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM customer WHERE id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getCustomers,
    getCustomerById
};