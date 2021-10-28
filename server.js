const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
const jobRouters = require('./routers/jobs-routers');
const sequelize = require('./models/tables');
// require('./models/tables');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(jobRouters);
sequelize.sync({
    force: true
}).then(suc => console.log("SUCCESS=====", suc)).catch(err => console.log("ERROR+++++", err))

// test connection
// sequelize
// // .authenticate()
//     .then(() => {
//         sequelize.sync({
//                 // // // force: true,
//                 // alter: true
//             }).then(done => console.log("Models sync"))
//             .catch(error => console.log("Models not sync", error));
//     })
//     .catch(err => {
//         if (req.session.role) {
//             res.redirect('/500');
//         } else {
//             res.redirect('/login');
//         }
//     });




app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))