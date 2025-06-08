/********************************************************************************
*  WEB322 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Lachlan Anderson Student ID: 113780241 Date: June 07 2025
*
********************************************************************************/

const path = require('path');
const express=require('express');
const app=express();
const HTTP_PORT=process.env.PORT || 8012;
const projectData = require("./modules/projects");

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

app.get('/', (req, res)=>{
    res.send('Assignment 2: Lachlan Anderson - 113780241');
})

app.get('/solutions/projects', async (req, res)=>{
    try {
        let data = await projectData.getAllProjects();
        res.send(data);
    } catch(err) {
        res.send(err);
    }
})

app.get('/solutions/projects/id-demo', async (req, res)=>{
    try {
        let data = await projectData.getProjectById(9);
        res.send(data);
    } catch(err) { 
        res.send(err);
    }
})

app.get('/solutions/projects/sector-demo', async (req, res)=>{
    try {
        let data = await projectData.getProjectsBySector("    agriculTUre    ");
        res.send(data);
    } catch(err) {
        res.send(err);
    }
})

// starting the server after data initialization has completed
projectData.initialize().then(app.listen(HTTP_PORT, ()=>console.log(`The server is listening on port: ${HTTP_PORT}`))).catch((err)=> {
    console.log(err);
})
