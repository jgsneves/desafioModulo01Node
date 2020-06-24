const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  const { id } = request.query;

  if (!id) {
    return response.json(repositories);
  } else {
    return response.json(
      repositories.filter( repo => repo.id.includes(id))
    );
  }
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(
    repo => repo.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found!"
    })
  }


  const repository = {
    title,
    url,
    techs,
  }

  repositories[repositoryIndex] = repository;
  
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndex = repositories.findIndex(
    repo => repo.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found!"
    });
  }

  repositories.slice(repositoryIndex, 1);

  return response.json({
    message: "Repository deleted"
  });
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(
    repo => repo.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found!"
    })
  }

  const repository = repositories[repositoryIndex].likes = likes + 1; 

  return response.json(repository)
});

module.exports = app;
