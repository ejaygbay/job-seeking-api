let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');
const { v4: uuidv4 } = require('uuid');
const Job = require('../models/tables');
require('dotenv').config();
let api_key = process.env.api_key;
let res_obj = {
    code: 0,
    msg: "Job entered"
}

const auth = (data) => {
    let obj_keys = Object.keys(data);

    if (obj_keys.includes('api_key')) {
        let auth_key = data.api_key;

        if (auth_key === api_key)
            return true;
        else
            false;
    } else
        return false;
}

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const getJobs = async(req, res) => {
    let auth_result = await auth(req.query);

    if (auth_result) {
        db.all(`SELECT * FROM jobs`, (err, data) => res.send(data))
    } else {
        res_obj.code = 401;
        res_obj.msg = "Sorry! Unauthorized step taken";
        res.send(res_obj);
    }
}

const createJob = async(req, res) => {
    let auth_result = await auth(req.query);

    if (auth_result) {
        let title = req.body.title;
        let job_link = req.body.job_link;
        let end_date = req.body.end_date;

        await Job
            .findOrCreate({ where: { title: title, job_link: job_link, end_date: end_date } })
            .then(suc => {
                if (!suc[1]) {
                    res_obj.code = 1;
                    res_obj.msg = "Job already exist";
                }
            })
            .catch(err => {
                res_obj.code = 1;
                res_obj.msg = "Job not entered";
                res_obj.error_msg = err.message;
            })
    } else {
        res_obj.code = 401;
        res_obj.msg = "Sorry! Unauthorized step taken";
    }

    res.send(res_obj);
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

const deleteJob = async(req, res) => {
    let auth_result = await auth(req.query);

    if (auth_result) {
        let job_id = req.query.id;
        db.run(`DELETE FROM jobs WHERE id = ?;`, job_id, (err) => {
            if (!err) {
                res.send({ status: 0, msg: 'Job deleted' });
            } else {
                res.send({ status: 1, msg: 'Job not deleted' });
            }
        });
    } else {
        res_obj.code = 401;
        res_obj.msg = "Sorry! Unauthorized step taken";
    }

    res.send(res_obj);
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