let sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./jobsDB.db');

const getAPIDocumentation = (req, res) => {
    res.send("API Documentation");
}

const createJob = (req, res) => {
    let title = req.body.title;
    let desctiption = req.body.description;
    let end_date = req.body.end_date;

    db.run(`INSERT INTO jobs("title", "descriptions", "end_date", "date_created") VALUES(?,?,?, datetime('now'));`, title, desctiption, end_date, (result) => {
        let res_obj = {
            code: 0,
            msg: "Job Created"
        }
        if(result !== null){
            res_obj.code = 1;
            res_obj.msg = "Job Not Created";
            res_obj.error_msg = result.message;
        }

        res.send(res_obj);
    })
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