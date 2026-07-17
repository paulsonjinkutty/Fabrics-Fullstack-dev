
const pool = require("../db/database");

const getProductVariants = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM product_variant");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getProductVariantById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM product_variant WHERE variant_id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getProductVariants,
    getProductVariantById
};