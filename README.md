# JOBS API DOCUMENTATION
v1.0 | By: Emmanuel Jaygbay

<br/>

## Description
This API was created for people who want to create job vacancies or get access to job vacancies created by others.

<br/>

***

## API: https://localhost:3000
***
<br/>

**CREATE JOB**

Endpoint: **/v1/jobs** <br/>
Method: **POST** <br/>
Body: Params (**title, description, end_date**)

***EXAMPLE:*** JavaScript

Request
```
fetch("https://localhost:3000/v1/jobs", {
    method: POST,
    body: {
        title: "Vacancy For Software Developer",
        description: "The Ministry of Youth and Sports is in search of a full-stack
        developer who is good at React, Node, Postgres.",
        end_date: "11/25/2021"
    }
})
```

Response
```
{
  "code": 0,
  "msg": "Job Created"
}
```
```
{
  "code": 1,
  "msg": "Job Not Created",
  "error_msg": "Dynamic error message here"
}
```