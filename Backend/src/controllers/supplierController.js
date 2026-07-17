
const pool = require("../db/database");

const getSuppliers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM suppliers");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getSupplierById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM suppliers WHERE id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getSuppliers,
    getSupplierById
};