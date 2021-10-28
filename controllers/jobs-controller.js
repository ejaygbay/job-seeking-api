let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');
const { v4: uuidv4 } = require('uuid');
const Job = require('../models/tables');

// console.log(uuidv4());
// console.log(Jobs());

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const getJobs = (req, res) => db.all(`SELECT * FROM jobs`, (err, data) => res.send(data))

const createJob = async(req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let end_date = req.body.end_date;
    let res_obj = {
        code: 0,
        msg: "Job Entered"
    }

    await Job.create({
            id: uuidv4(),
            title: title,
            description: description,
            end_date: end_date
        }).then(suc => res.send(res_obj))
        .catch(err => {
            res_obj.code = 1;
            res_obj.msg = "Job Not Entered";
            res_obj.error_msg = result.message;
            res.send(res_obj);
        })
}

const editJob = (req, res) => {
    let job_id = req.query.id;
    let title = req.body.title.trim();
    let description = req.body.description.trim();
    let end_date = req.body.end_date.trim();

    if (checkLength(title) > 0 && checkLength(description) > 0 && checkLength(end_date) > 0) {
        db.run(`UPDATE jobs SET title = ?, descriptions = ?, end_date = ? WHERE id = ?;`, title, description, end_date, job_id, (err) => {
            if (!err) {
                res.send({ status: 0, msg: 'Job updated' });
            } else {
                res.send({ status: 1, msg: 'Job not updated' });
            }
        });
    } else {
        db.run(`UPDATE jobs SET title = ? WHERE id = ?;`, title, job_id, (err) => {
            if (!err) {
                res.send({ status: 0, msg: 'Job title updated' });
            } else {
                res.send({ status: 1, msg: 'Job title not updated' });
            }
        });
    }
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