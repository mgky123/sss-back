const sqlite3 = require('sqlite3');

const dbPath = './sss.db';

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
    db.run('INSERT INTO users (name) VALUES (?)', 'John Doe');
    db.all('SELECT * FROM users', (err, rows) => {
    
        if (err) {
      console.error(err);
    } else {
      console.log(rows);
    }
  });
});