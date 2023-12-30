const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 5000;

const db = new sqlite3.Database('./database.db')

app.use(cors());
app.use(express.json());

app.get('/api/all-countries', (req, res) => {
    const query = `SELECT DISTINCT coa_name, coa FROM refugees`
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    })
});

app.get('/api/user-input', (req, res) => {
    const { year } = req.query;
    const { coa } = req.query;
    const query = `SELECT * FROM refugees WHERE year = ? AND coa = ?`
    db.all(query, [year, coa], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});