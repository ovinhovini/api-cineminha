const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const tabelaFilme = [
    {
      id: 0,
      nome: "Os Aventureiros: A Origem",
      ticket: 47,
      status: "Disponível",
    },
    { id: 1, nome: "Barbie", ticket: 25, status: "Disponível" },
  ];
  
  const tabelaUsuario = [
    { id: 0, email: "email0@gmail.com", senha: "senha" },
    { id: 1, email: "email1@gmail.com", senha: "senha" },
  ];

function comprarFilme(filmeId, usuarioId) {
    if (tabelaFilme[filmeId].status === "Disponível") {
        if (tabelaFilme[filmeId].ticket > 0) {
          tabelaFilme[filmeId].ticket--;
          const token = gerarToken();
          enviarTokenParaUsuario(token, tabelaUsuario[usuarioId].email);
        } else {
          console.log("Não há tickets disponíveis para esse filme.");
        }
    } else {
      console.log("Filme não está disponível para compra.");
    }
  }

function gerarToken() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const comprimentoToken = 10;
    let token = '';
  
    for (let i = 0; i < comprimentoToken; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      token += caracteres.charAt(indiceAleatorio);
    }
  
    return token;
  }
  
  function enviarTokenParaUsuario(token, email) {
    console.log(`Token ${token} enviado para o email ${email}.`);
  }
  
app.get('/', (req, res, next) => {
    res.send('u fond us')
});

app.post("/filme/add", (req, res, next) => {
    const nome = req.body.nome;
    const ticket = req.body.ticket;
    const status = req.body.status;
  
    tabelaFilme.push({
      id: tabelaFilme.length,
      nome: nome,
      ticket: ticket,
      status: status,
    });

    console.log(`Tamanho do array: ${tabelaFilme.length}`);
    res.send("Filme Adicionado com sucesso");
  });
  
  app.get("/filme/list", (req, res, next) => {
    res.json(tabelaFilme);
  });
  
  app.post("/user/login", (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;
    var usuario;
  
    for (var i = 0; i < tabelaUsuario.length; i++) {
      if (tabelaUsuario[i].email === email && tabelaUsuario[i].senha === senha) {
        usuario = tabelaUsuario[i];
      }
    }
  
    try {
      if (usuario) {
        return res.status(201).json({ id: usuario.id });
      } else {
        return res.status(401).json({ message: "Usuário não encontrado" });
      }
    } catch (error) {
      console.error(`Erro: ${error}`);
      return res.status(401).json({ error: "Erro interno do servidor" });
    }
  });
  
  app.post("/user/register", (req, res, next) => {
    const email = req.body.email;
    const senha = req.body.senha;
    const nickname = req.body.nickname;
  
    try {
      tabelaUsuario.push({
        id: tabelaUsuario.length,
        nickname: nickname,
        email: email,
        senha: senha,
      });
      res.send("Usuário Adicionado com sucesso");
    } catch (error) {
      console.error(`Erro: ${error}`);
      return res.status(401).json({ error: "Erro interno do servidor" });
    }
  });
  
  app.get("/user/list", (req, res, next) => {
    res.send(tabelaUsuario);
  });


module.exports = app;