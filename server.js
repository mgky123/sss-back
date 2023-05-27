const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('./sss.db');

app.use(cors());

app.get('/data', (req,res)=>{
    db.all('SELECT * FROM users', (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.json(rows);
        }
    });
});

app.get('/events', (req,res)=>{
    db.all('SELECT id, eventtype, username, startdate, enddate, editable FROM events', (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.json(rows);
        }
    });
});

app.listen(port, ()=>{
    console.log('Server is listening on port ${port}');
});