
const pool = require("../db/database");

const getEmployee = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM employee");

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).send(err.message);
    }
};



const getEmployeeById = async (req, res) => {

    try {

        const id = req.params.id;

        const result = await pool.query(
            "SELECT * FROM employee WHERE id = $1",
            [id]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).send(err.message);

    }

};

module.exports = {
    getEmployee,
    getEmployeeById
};