const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 5000;

const db = new sqlite3.Database('./database.db')

app.use(cors());
app.use(express.json());

app.get('/api/all-countries', (req, res) => {
    const query = `SELECT DISTINCT coa_name, coa_iso FROM refugees`
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
    const { year, country, migration, startYear, endYear } = req.query;
    let query = ``;
    let values = [];
    if (startYear !== '' && endYear !== ''){
        query = `SELECT coo_iso, coa_iso, SUM(refugees) AS 'refugees' FROM refugees WHERE ${migration == 'Emigration' ? 'coo_iso' : 'coa_iso'} = ? AND year BETWEEN ? AND ? GROUP BY ${migration == 'Emigration' ? 'coa_iso' : 'coo_iso'};`;
        values = [country, startYear, endYear];
    } else {
        query = `SELECT * FROM refugees WHERE ${migration == 'Emigration' ? 'coa_iso' : 'coo_iso'} = ? AND year = ?`;
        values = [country, year];
    }
    db.all(query, values, (err, rows) => {
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