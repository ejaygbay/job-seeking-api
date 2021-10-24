CREATE TABLE IF NOT EXISTS jobs(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, title VARCHAR(30) NOT NULL, descriptions VARCHAR(30), end_date DATETIME, date_created DATETIME

INSERT INTO jobs("title", "description", "end_date", "date_created") VALUES(?,?,?, datetime('now'));