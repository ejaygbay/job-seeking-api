let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const getJobs = (req, res) => db.all(`SELECT * FROM jobs`, (err, data) => res.send(data))

const createJob = (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let end_date = req.body.end_date;

    db.run(`INSERT INTO jobs("title", "descriptions", "end_date", "date_created") VALUES(?,?,?, datetime('now'));`, title, description, end_date, (result) => {
        let res_obj = {
            code: 0,
            msg: "Job Created"
        }
        if (result !== null) {
            res_obj.code = 1;
            res_obj.msg = "Job Not Created";
            res_obj.error_msg = result.message;
        }

        res.send(res_obj);
    })
}

const editJob = (req, res) => {
    let job_id = req.id;
    let title = req.body.title.trim();
    let description = req.body.description.trim();
    let end_date = req.body.end_date.trim();

    console.log(title)

    // if (checkLength(title) > 0 && checkLength(description) > 0 && checkLength(end_date) > 0) {
    db.run(`UPDATE jobs SET title = ? WHERE id = ?;`, title, job_id, (err) => {
        if (!err) {
            console.log(err);
            res.send({ status: 0, msg: 'Job updated' });
        } else {
            console.log(err);
            res.send({ status: 1, msg: 'Job not updated' });
        }
    });
    // }
}

const deleteJob = (req, res) => {
    let job_id = req.query.id;
    db.run(`DELETE FROM jobs WHERE id = ?;`, job_id, (err) => {
        if (!err) {
            res.send({ status: 0, msg: 'Job deleted' });
        } else {
            res.send({ status: 1, msg: 'Job not deleted' });
        }
    });
}

const checkLength = (text) => text.length;

module.exports = {
    getAPIDocumentation,
    getJobs,
    createJob,
    editJob,
    deleteJob
}