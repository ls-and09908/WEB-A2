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

app.get('/solutions/projects', (req, res)=>{
    projectData.getAllProjects().then(res.send(data)).catch((err)=>{ res.send(err); });
})

app.get('/solutions/projects/id-demo', (req, res)=>{
    projectData.getProjectById(9).then(res.send(data)).catch((err)=>{ res.send(err); });
})

app.get('/solutions/projects/sector-demo', (req, res)=>{
    projectData.getProjectBySector("    agriculTUre  \n    ").then(res.send(data)).catch((err)=>{ res.send(err); });
})

// starting the server after data initialization has completed
projectData.initialize().then(app.listen(HTTP_PORT, ()=>console.log(`The server is listening on port: ${HTTP_PORT}`))).catch((err)=> {
    console.log(err);
})
