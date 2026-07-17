
const pool = require("../db/database");

const getProduct = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM inventory");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getProductById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM inventory WHERE product_id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getProduct,
    getProductById
};