const express = require("express");
const cors = require("cors");

const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  let { title, url, techs} = request.body; 
  const repository = {
    id: uuid(),
    title,
    likes: 0,
    techs,
    title,
    url,
  }
  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if(repositoryIndex == -1){
    return response.status(400).json({error: 'Repository does not exists'});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes,
  }

  repositories[repositoryIndex] = repository

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id == id);

  if( repositoryIndex  > 0){
    repositories.splice(repositoryIndex, 1);
  } else{
    return response.status(400).json({ error: 'Repository does not exists.'})
  }
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const index = repositories.findIndex(obj => obj.id == id)

  if (index < 0) {
    return response.status(400)
      .json({ mensage: "Repository not found" })
  }

  let repository = repositories[index]
  repository.likes = repository.likes + 1;
  repositories[index] = repository

  return response.status(200).json(repository);
});

module.exports = app;