const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");


let projects = [];

// fills the projects array with projects from projectData, and the sector names retrieved from sectorData
function initialize(){
    return new Promise((resolve, reject)=>{
        projects = projectData;
        projects.forEach(project => {
            let target = project.sector_id;
        
            project.sector = sectorData.find((sec)=>{
                return sec.id === target;
            }).sector_name;
            if(project.sector === undefined){
                reject("project sector not found.");
                return;
            }
        });
    resolve();
    return;
    })
}

// returns the projects array
function getAllProjects(){
    return new Promise((resolve, reject) =>{
        resolve(projects);
        if (projects === undefined){
            reject("projects array is empty");
        }
        return
    })
}

// returns a project object with the specified id
function getProjectById(projectId){
    return new Promise((resolve, reject)=>{
        let prj = projects.find((project)=>{
            return project.id === projectId;
        })
        resolve(prj);
        if(prj === undefined){
            reject("unable to find requested project");
        }
        return
    })
}

// returns all projects from the specified sector, case insensitive, partial match search
function getProjectsBySector(sector){
   return new Promise((resolve, reject)=>{
        let target = sector.trim().toLowerCase();
        sectorPrj = projects.filter((project)=>{
            return project.sector.toLowerCase().includes(target);
        })
        resolve(sectorPrj);
        if(sectorPrj === undefined){
            reject("unable to find requested projects");
        }
        return
   })
}

module.exports = { initialize, getAllProjects, getProjectById, getProjectsBySector };

// async function tester() {
//     try {
//         let init = await initialize();
//         let got = await getAllProjects()
//         //console.log(got);
//         let getprj = await getProjectById(9);
//         //console.log(getprj);
//         let getsec = await getProjectsBySector("agriculture");
//         console.log(getsec);

//     } catch(err){
//         console.log(err);
//     }
// }
// console.log("Starting tester... ");
// tester();


