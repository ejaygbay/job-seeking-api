let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const createJob = (req, res) => {
    let title = req.body.title;
    let desctiption = req.body.desctiption;
    let end_date = req.body.end_date;
    // db.run()
    res.send("Create Job");
}

const editJob = (req, res) => {
    res.send("Edit Job");
}

const deleteJob = (req, res) => {
    res.send("Delete Job");
}

module.exports = {
    getAPIDocumentation,
    createJob,
    editJob,
    deleteJob
}