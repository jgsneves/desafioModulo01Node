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

  const repositoryList = repositories.filter(
    repo => repo.id === id
  );

  const repositoryIndex = repositories.findIndex(
    repo => repo.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({
      error: "Repository not found!"
    })
  }

  const oldRepositoryId = repositoryList[0].id;
  const oldRespositoryLikes = repositoryList[0].likes;

  const newRepository = {
    id: oldRepositoryId,
    title,
    url,
    techs,
    likes: oldRespositoryLikes,
  }

  repositories[repositoryIndex] = newRepository;

  return response.json(newRepository);
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

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json(undefined);
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

  repositories[repositoryIndex].likes += 1;
  
  const repositoryLikes = repositories[repositoryIndex].likes

  return response.json({
    likes: repositoryLikes,
  })
});

module.exports = app;
