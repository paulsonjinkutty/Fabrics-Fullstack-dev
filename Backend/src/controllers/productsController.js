const pool = require("../db/database");

const getProducts = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.slug,
                p.description,
                p.price,
                p.image_url AS "imageUrl",
                p.is_featured AS "isFeatured",
                p.in_stock AS "inStock",
                p.sizes,
                p.colors,
                c.name AS "categoryName",
                c.slug AS "categorySlug"
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            ORDER BY p.id;
        `);

        res.json(result.rows);

    } catch (err) {

        console.error(err);
        res.status(500).send(err.message);

    }
};

const getProductById = async (req, res) => {

    try {

        const { id } = req.params;

        const result = await pool.query(`
            SELECT
                p.id,
                p.name,
                p.slug,
                p.description,
                p.price,
                p.image_url AS "imageUrl",
                p.is_featured AS "isFeatured",
                p.in_stock AS "inStock",
                p.sizes,
                p.colors,
                c.name AS "categoryName",
                c.slug AS "categorySlug"
            FROM products p
            JOIN categories c
                ON p.category_id = c.id
            WHERE p.id = $1;
        `, [id]);

        res.json(result.rows[0]);

    } catch (err) {

        console.error(err);
        res.status(500).send(err.message);

    }
};

module.exports = {
    getProducts,
    getProductById
};