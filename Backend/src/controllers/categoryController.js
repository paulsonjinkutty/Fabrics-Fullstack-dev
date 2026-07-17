const pool = require("../db/database");

const getCategories = async (req, res) => {
    try {

        const result = await pool.query(`
            SELECT
                c.id,
                c.name,
                c.slug,
                c.description,
                COUNT(p.id)::int AS "productCount"
            FROM categories c
            LEFT JOIN products p
            ON c.id = p.category_id
            GROUP BY c.id
            ORDER BY c.name;
        `);

        res.json(result.rows);

    } catch (err) {

        console.error(err);
        res.status(500).send(err.message);

    }
};

const getCategoryById = async (req,res)=>{

    try{

        const {id}=req.params;

        const result=await pool.query(

            `SELECT *
             FROM categories
             WHERE id=$1`,

            [id]

        );

        res.json(result.rows[0]);

    }catch(err){

        console.error(err);
        res.status(500).send(err.message);

    }

};

module.exports={
    getCategories,
    getCategoryById
};