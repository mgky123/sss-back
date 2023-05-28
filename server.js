const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

const db = new sqlite3.Database('./sss.db');

app.use(cors());

app.get('/SelectEvents', (req, res)=>{
    db.all('SELECT id, eventtype, username, startdate, enddate, editable, title FROM events', (err, rows) => {
        if(err){
            res.status(500).send(err.message);
        }else{
            res.json(rows);
        }
    });
});

app.use(express.json());
app.post('/InsertEvents', (req, res)=>{
    const events = req.body;

    events.forEach(event => {
        const {title, start, end} = event;
        const sql = "INSERT INTO events (eventtype, username, startdate, enddate, editable, title) VALUES (?, 'user1', ?, ?, 'true', ?)";

        db.run(sql, [title, start, end, title], function(err){
            if(err){
                console.error('INSERT 실패', err.message);
            }else{
                console.log('INSTER 성공');
            }
        });
    });

    res.send('INSERT 완료');
});

app.listen(port, ()=>{
    console.log('Server is listening on port ${port}');
});