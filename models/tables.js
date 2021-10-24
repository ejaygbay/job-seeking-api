let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');

/** JOBS TABLE */
db.run(`CREATE TABLE IF NOT EXISTS jobs(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title VARCHAR(30) NOT NULL, description VARCHAR(30), end_date DATETIME, date_created DATETIME);
    `, (err, result) => {
    !err ? console.log("Jobs table created.") : console.log("Jobs table not created.")
})