const express = require('express');
const pool = require('./db');
const port = 3000;

const app = express();
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    try {   
        const data = await pool.query(SELECT * FROM)
        res.status(200).send(data.rows)
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }

});

app.post('/', async (req, res) => {
    const { name, location } = req.body;

    try {
        if (!name || !location) {
            return res.status(400).send({ message: 'Name and location are required' });
        }

        await pool.query('INSERT INTO SCHOOLS (name, address) VALUES ($1, $2)', [name, location]);
        res.status(201).send({ message: "Successfully added school" });
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});



app.get('/setup', async(req, res) => {
    
    try {   
        await pool.query('CREATE TABLE IF NOT EXISTS schools (id SERIAL PRIMARY KEY, name VARCHAR(100), address VARCHAR(100))')
        res.status(200).send({message: "Succefully created table" })

    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
