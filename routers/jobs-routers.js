const express = require('express');
const routers = express.Router();
const jobControllers = require('../controllers/jobs-controller');

routers.get('/', jobControllers.getAPIDocumentation);

routers.get('/v1/jobs', jobControllers.getJobs);

routers.post('/v1/jobs', jobControllers.createJob);

routers.patch('/v1/jobs', jobControllers.editJob);

routers.delete('/v1/jobs', jobControllers.deleteJob);

module.exports = routers;