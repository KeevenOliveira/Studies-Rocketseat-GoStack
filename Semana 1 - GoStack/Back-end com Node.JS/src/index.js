const express = require('express');

const {v4: uuidv4, v4: isUuid} = require('uuid');

// Universal Unic ID

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

/**
* Tipos de parâmetros:
* 
* Query Params: Filtros e paginação
* Route Params: Identificar recursos (Atualizar/Deletar)
* Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
*/

/**
 * Middleware:
 * 
 * Interceptador de requisições que pode interromper totalmente a requisição ou alterar dados da requisição.
 */

const app = express();

app.use(express.json());


const projects = [];
function logRequests(request, response, next){
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase} ${url}]`

    console.time(logLabel);

    next(); //próximo middleware

    console.timeEnd(logLabel);
}
function validateProjectID(request, response, next){
    const {id} = request.params;

    if(!isUuid(id)){
        return response.status(400).json({error: 'Invalid project ID.'});
    }
    return next();

}
app.use(logRequests);
app.use('/projects/:id', validateProjectID);

app.get('/projects', (request, response)=>{
    // return response.json([
    //     'Project 1',
    //     'Project 2'
    // ]);
    return response.json(projects);
});

app.post('/projects', (request, response) =>{

    const {title, owner} = request.body;

    const project = { id:uuidv4(), title, owner};

    projects.push(project);

    return response.json(project);

});
app.put('/projects/:id', (request, response)=>{

    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex<0){
        return response.status(400).json({error:'project not found'});
    }

    const project = {
        id,
        title,
        owner,
    }

    projects[projectIndex] = project;
    
    return response.json(project);
});
app.delete('/projects/:id', (request, response) =>{

    const {id} = request.params;

    const projectIndex = projects.findIndex(project => project.id == id);

    if(projectIndex<0){
        return response.status(400).json({error:'project not found'});
    }
    
    projects.splice(projectIndex, 1);
    
    return response.status(204).send();
});

app.listen(3333, ()=>{
    console.log('Back-end started!❤')
});