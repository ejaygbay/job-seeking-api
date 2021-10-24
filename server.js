const express = require('express');
const PORT = process.env.PORT || 3001
const app = express();
const jobRouters = require('./routers/jobs-routers');
require('./models/tables');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(jobRouters);

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))