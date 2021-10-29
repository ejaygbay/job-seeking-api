let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');
const { v4: uuidv4 } = require('uuid');
const Job = require('../models/tables');
let api_key = process.env.api_key;

const auth = (data) => {
    let obj_keys = Object.keys(data);
    if (obj_keys.includes('api_key')) {
        let auth_key = data.api_key;
        auth_key === api_key ? true : false
    }
    return false;
}

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const getJobs = (req, res) => db.all(`SELECT * FROM jobs`, (err, data) => res.send(data))

const createJob = async(req, res) => {
    let auth = auth(req.body);
    console.log(auth);

    let title = req.body.title;
    let job_link = req.body.job_link;
    let end_date = req.body.end_date;
    let res_obj = {
        code: 0,
        msg: "Job entered"
    }

    // await Job
    //     .findOrCreate({ where: { title: title, job_link: job_link, end_date: end_date } })
    //     .then(suc => {
    //         if (!suc[1]) {
    //             res_obj.code = 1;
    //             res_obj.msg = "Job already exist";
    //         }

    //         res.send(res_obj)
    //     })
    //     .catch(err => {
    //         res_obj.code = 1;
    //         res_obj.msg = "Job not entered";
    //         res_obj.error_msg = err.message;
    //         console.log("Error@@@@@@@@@@@@", err)
    //         res.send(res_obj);
    //     })
}

const editJob = (req, res) => {
    let job_id = req.query.id;
    let title = req.body.title.trim();
    let job_link = req.body.job_link.trim();
    let end_date = req.body.end_date.trim();

    if (checkLength(title) > 0 && checkLength(job_link) > 0 && checkLength(end_date) > 0) {
        db.run(`UPDATE jobs SET title = ?, job_links = ?, end_date = ? WHERE id = ?;`, title, job_link, end_date, job_id, (err) => {
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

const dontSleep = (req, res) => {
    res.send("I'm awake!!!")
}

const checkLength = (text) => text.length;

module.exports = {
    getAPIDocumentation,
    getJobs,
    createJob,
    editJob,
    deleteJob,
    dontSleep
}