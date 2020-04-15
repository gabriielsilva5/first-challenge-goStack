const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  if( title == '' || url == '' || techs == '') {
      response.status(400).json({erro: 'Campos vazios não são permitidos!'})
  } else {
      const repo = {id: uuid(), title, url, techs, likes: 0}
      repositories.push(repo)

      response.status(200).json(repo)
  }
});

app.put("/repositories/:id", (request, response) => {

  const { id } = request.params
  const { title, url, techs } = request.body

  const repoAtuIndex = repositories.findIndex(repo => repo.id === id)

  if(repoAtuIndex < 0) {
      response.status(400).json({ erro: "O id passado não existe!"})
  } else {
      const repo = { id: id, title, url, techs, likes: repositories[repoAtuIndex].likes }
    
      repositories[repoAtuIndex] = repo

      response.status(200).json(repo)
  }

});

app.delete("/repositories/:id", (request, response) => {
  
  const { id } = request.params
  
  const repoDelIndex = repositories.findIndex(repo => repo.id === id)

  if(repoDelIndex < 0) {
      response.status(400).json({ erro: 'Não existem repositórios com este ID na base de dados!' })
  } else {
      repositories.splice(repoDelIndex, 1)
      response.status(204).send()
  }

});

app.post("/repositories/:id/like", (request, response) => {
  
  const { id } = request.params

  const repoLikeIndex = repositories.findIndex(repo => repo.id === id)

  if(repoLikeIndex < 0){
      response.status(400).json({erro: 'Não existem repositórios com este ID na base de dados!' })
  } else {
    repositories[repoLikeIndex].likes += 1
    response.status(200).send()
  }


});

module.exports = app;
