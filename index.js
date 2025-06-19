import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";


const host = "0.0.0.0";
const port = 3000;
var listaTimes = [];
var listaJogadores = [];
const app = express()

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "M1nh4Ch4v3S3cr3t4",
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 30, 
        httpOnly: true,
        secure: false 
    }
}));

app.use(cookieParser());


app.get("/", verificarAutenticacao, (req, res) => {
    const ultimoLogin = req.cookies.ultimoLogin;
    let countTime = listaTimes.length;
    let countJogador = listaJogadores.length;
     res.send(`  
        <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Home</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #1e3c72, #2a5298);
      color: white;
      font-family: 'Poppins', sans-serif;
      min-height: 100vh;
    }
    .navbar {
      background: #152642;
    }
    .navbar-brand, .nav-link {
      color: white !important;
    }
    .nav-link:hover {
      text-decoration: underline;
    }
    .main-content {
      padding: 80px 20px;
      text-align: center;
    }
    .btn-lg {
      font-weight: 500;
    }
    .card-estatistica {
      background-color: white;
      color: #152642;
      border-radius: 12px;
      padding: 30px 20px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
  </style>
</head>
<body>
  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Sistema de Times</a>
      <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarConteudo">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
          <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
          <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

 
  <div class="main-content container">
    <h1 class="mb-3">Bem-vindo ao Sistema</h1>
    <p class="mb-5 fs-5">Gerencie seus times e jogadores com facilidade.</p>

    
    <div class="row justify-content-center g-3 mb-5">
      <div class="col-md-3">
        <a href="/cadastrarTime" class="btn btn-outline-light btn-lg w-100">➕ Cadastrar Time</a>
      </div>
      <div class="col-md-3">
        <a href="/cadastrarJogador" class="btn btn-outline-light btn-lg w-100">👤 Cadastrar Jogador</a>
      </div>
      <div class="col-md-3">
        <a href="/listarTimes" class="btn btn-outline-warning btn-lg w-100">📋 Ver Times</a>
      </div>
      <div class="col-md-3">
        <a href="/listarJogadores" class="btn btn-outline-warning btn-lg w-100">📋 Ver Jogadores</a>
      </div>
    </div>

    
    <div class="row justify-content-center g-4">
      <div class="col-md-3">
        <div class="card-estatistica">
          <h2 class="display-6">${countTime}</h2>
          <p class="mb-0">Times cadastrados</p>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card-estatistica">
          <h2 class="display-6">${countJogador}</h2>
          <p class="mb-0">Jogadores registrados</p>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

    `)
});

app.get("/login", (req, res) => {
 res.send(`
    <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #1e3c72, #2a5298);
      font-family: 'Poppins', sans-serif;
    }
    .card-custom {
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    .btn-custom {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 20px;
    }
    .btn-custom:hover {
      background-color: #1e3c72;
      color: white;
    }
    .error-msg {
      color: #dc2626;
      font-size: 0.85rem;
    }
    .form-label {
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh">
    <div class="card-custom col-12 col-md-6 col-lg-4">
      <h3 class="text-center mb-4">Login</h3>
      <form method="POST" action="/login">
        <div class="mb-3">
          <label for="usuario" class="form-label">Usuário</label>
          <input type="text" name="usuario" class="form-control" id="usuario" />
        </div>
        <div class="mb-3">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" name="senha" class="form-control" id="senha" />
        </div>
        
        <div class="d-grid">
          <button type="submit" class="btn btn-custom">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</body>
</html>

    
    `)
});


app.post("/login", (req, res) => {
    const usuario = req.body.usuario;
    const senha = req.body.senha;
    if (usuario == "admin" && senha == "123"){
        req.session.logado = true;
        const dataHoraAtuais = new Date();
        res.cookie('ultimoLogin',dataHoraAtuais.toLocaleString(), { maxAge: 1000 * 60 * 60 * 24 * 30});
        res.redirect("/");
    }
    else{
         res.send(`
           <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #1e3c72, #2a5298);
      font-family: 'Poppins', sans-serif;
    }
    .card-custom {
      background-color: #fff;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 0 15px rgba(0,0,0,0.1);
    }
    .btn-custom {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 20px;
    }
    .btn-custom:hover {
      background-color: #1e3c72;
      color: white;
    }
    .error-msg {
      color: #dc2626;
      font-size: 0.85rem;
    }
    .form-label {
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container d-flex align-items-center justify-content-center" style="min-height: 100vh">
    <div class="card-custom col-12 col-md-6 col-lg-4">
      <h3 class="text-center mb-4">Login</h3>
      <form method="POST" action="/login">
        <div class="mb-3">
          <label for="usuario" class="form-label">Usuário</label>
          <input type="text" name="usuario" class="form-control" id="usuario" />
          
        </div>
        <div class="mb-3">
          <label for="senha" class="form-label">Senha</label>
          <input type="password" name="senha" class="form-control" id="senha" />
         
        </div>
        <span class="error-msg">Usuário ou senha inválidos!</span>
        <div class="d-grid">
          <button type="submit" class="btn btn-custom">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</body>
</html>

    `);
    }
    
});

app.get("/cadastrarTime", verificarAutenticacao, (req, res) =>{
     const ultimoLogin = req.cookies.ultimoLogin;
      res.send(`
        <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastrar Time</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #1e3c72, #2a5298);
      color: black;
      font-family: 'Poppins', sans-serif;
    }
    .navbar {
      background: #152642;
    }
    .navbar-brand, .nav-link {
      color: white !important;
    }
    .nav-link:hover {
      text-decoration: underline;
    }
    .form-container {
      margin-top: 80px;
    }
    .card-custom {
      background: #fff;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .btn-custom {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 10px;
    }
    .btn-custom:hover {
      background-color: #1e3c72;
      color: white;
    }
     .navbar-toggler {
    border: 1px solid white;
  }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Sistema de Times</a>
      <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarConteudo">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
          <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
          <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container form-container">
    <div class="card-custom">
      <h3>Cadastrar Time</h3>
      <form method="POST" action="/cadastrarTime">
        <div class="mb-3">
          <label class="form-label">Nome da Equipe</label>
          <input type="text" class="form-control" name="nomeEquipe">
        </div>
        <div class="mb-3">
          <label class="form-label">Técnico Responsável</label>
          <input type="text" class="form-control" name="nomeTecnico">
        </div>
        <div class="mb-3">
          <label class="form-label">Telefone do Técnico</label>
          <input type="tel" class="form-control" name="telefoneTecnico">
        </div>
        <button class="btn btn-custom">Cadastrar</button>
      </form>
    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
    `);
})


app.post("/cadastrarTime", verificarAutenticacao, (req, res) => {
    const ultimoLogin = req.cookies.ultimoLogin;
    const nomeEquipe = req.body.nomeEquipe;
    const nomeTecnico = req.body.nomeTecnico;
    const telefoneTecnico = req.body.telefoneTecnico;

    if (nomeEquipe && nomeTecnico && telefoneTecnico) {
        listaTimes.push({
            nomeEquipe: nomeEquipe,
            nomeTecnico: nomeTecnico,
            telefoneTecnico: telefoneTecnico
        });
        res.redirect("/listarTimes");
    } else {
        let conteudo = `
<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cadastrar Time</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
  <style>
    body {
      background: linear-gradient(to right, #1e3c72, #2a5298);
      color: black;
      font-family: 'Poppins', sans-serif;
    }
    .navbar {
      background: #152642;
    }
    .navbar-brand, .nav-link {
      color: white !important;
    }
    .nav-link:hover {
      text-decoration: underline;
    }
    .form-container {
      margin-top: 80px;
    }
    .card-custom {
      background: #fff;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    .btn-custom {
      background-color: #1e3c72;
      color: white;
      border: none;
      border-radius: 10px;
    }
    .btn-custom:hover {
      background-color: #1e3c72;
      color: white;
    }
    .navbar-toggler {
      border: 1px solid white;
    }
  </style>
</head>
<body>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Sistema de Times</a>
      <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarConteudo">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
          <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
          <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container form-container">
    <div class="card-custom">
      <h3>Cadastrar Time</h3>
      <form method="POST" action="/cadastrarTime">
        <div class="mb-3">
          <label class="form-label">Nome da Equipe</label>
          <input type="text" class="form-control" name="nomeEquipe" value="${nomeEquipe || ''}">
          ${!nomeEquipe ? '<span class="text-danger">Informe o nome da equipe</span>' : ''}
        </div>
        <div class="mb-3">
          <label class="form-label">Técnico Responsável</label>
          <input type="text" class="form-control" name="nomeTecnico" value="${nomeTecnico || ''}">
          ${!nomeTecnico ? '<span class="text-danger">Informe o nome do técnico</span>' : ''}
        </div>
        <div class="mb-3">
          <label class="form-label">Telefone do Técnico</label>
          <input type="tel" class="form-control" name="telefoneTecnico" value="${telefoneTecnico || ''}">
          ${!telefoneTecnico ? '<span class="text-danger">Informe o telefone do técnico</span>' : ''}
        </div>
        <button type="submit" class="btn btn-custom">Cadastrar</button>
        <a href="/" class="btn btn-secondary">Voltar</a>
      </form>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
        `;

        res.send(conteudo);
    }
});

app.get("/listarTimes", verificarAutenticacao, (req, res) => {
    let tabela = "";
    const ultimoLogin = req.cookies.ultimoLogin;

    if (listaTimes.length > 0) {
        for (let t of listaTimes) {
            tabela += `
                <tr>
                    <td>${t.nomeEquipe}</td>
                    <td>${t.nomeTecnico}</td>
                    <td>${t.telefoneTecnico}</td>
                </tr>
            `;
        }
    } else {
        tabela = `<tr><td colspan="3" class="text-center">Nenhum time cadastrado ainda.</td></tr>`;
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listar Times</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(to right, #1e3c72, #2a5298);
                    font-family: 'Poppins', sans-serif;
                }
                  .navbar {
                      background: #152642;
                    }
                  .navbar-brand, .nav-link {
                    color: white !important;
                  }
                  .nav-link:hover {
                    text-decoration: underline;
                  }
                .table-container {
                    margin-top: 80px;
                }
                .btn-custom {
                    background: #152642;
                    color: white;
                    border-radius: 10px;
                    border: none;
                }
                .btn-custom:hover {
                    background: #152642;
                    color: white;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">Sistema de Times</a>
              <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarConteudo">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
                  <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
                  <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
                </ul>
                <ul class="navbar-nav">
                  <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>

            <div class="container table-container">
                <h3 class="text-white">Times Cadastrados</h3>
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Equipe</th>
                            <th>Técnico</th>
                            <th>Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tabela}
                    </tbody>
                </table>
                <div class="text-center mt-3">
                    <a href="/cadastrarTime" class="btn btn-custom">Cadastrar Novo Time</a>
                </div>
            </div>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});

app.get("/cadastrarJogador", verificarAutenticacao, (req, res) => {
  const ultimoLogin = req.cookies.ultimoLogin;
  let opTime = "";
  for (let i = 0; i < listaTimes.length; i++) {
    opTime += `<option value="${listaTimes[i].nomeEquipe}">${listaTimes[i].nomeEquipe}</option>`;
  }

  res.send(`
  <!DOCTYPE html>
  <html lang="pt-br">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Jogador</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
    <style>
      body {
        background: linear-gradient(to right, #1e3c72, #2a5298);
        color: black;
        font-family: 'Poppins', sans-serif;
      }
      .navbar {
        background: #152642;
      }
      .navbar-brand, .nav-link {
        color: white !important;
      }
      .nav-link:hover {
        text-decoration: underline;
      }
      .form-container {
        margin-top: 80px;
      }
      .card-custom {
        background: #fff;
        border-radius: 20px;
        padding: 30px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      .btn-custom {
        background-color: #1e3c72;
        color: white;
        border: none;
        border-radius: 10px;
      }
      .btn-custom:hover {
        background-color: #1e3c72;
        color: white;
      }
      .navbar-toggler {
        border: 1px solid white;
      }
    </style>
  </head>
  <body>
    <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Sistema de Times</a>
      <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarConteudo">
        <ul class="navbar-nav me-auto">
          <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
          <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
          <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
          <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </nav>

    <div class="container form-container">
      <div class="card-custom">
        <h3>Cadastrar Jogador</h3>
        <form method="POST" action="/cadastrarJogador">
          <div class="mb-3">
            <label class="form-label">Nome do Jogador</label>
            <input type="text" class="form-control" name="nomeJogador">
          </div>
          <div class="mb-3">
            <label class="form-label">Número da Camisa</label>
            <input type="number" class="form-control" name="numeroCamisa">
          </div>
          <div class="mb-3">
            <label class="form-label">Data de Nascimento</label>
            <input type="date" class="form-control" name="nascimento">
          </div>
          <div class="mb-3">
            <label class="form-label">Altura(cm)</label>
            <input type="number" class="form-control" name="altura">
          </div>
          <div class="mb-3">
            <label class="form-label">Gênero</label>
            <select class="form-select" name="genero">
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Posição</label>
            <input type="text" class="form-control" name="posicao">
          </div>
          <div class="mb-3">
            <label class="form-label">Equipe</label>
            <select class="form-select" name="equipe">
              <option value="">Selecione</option>
              ${opTime}
            </select>
          </div>
          <button type="submit" class="btn btn-custom">Cadastrar</button>
          <a href="/" class="btn btn-secondary">Voltar</a>
        </form>
      </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  </body>
  </html>
  `);
});



app.post("/cadastrarJogador", verificarAutenticacao, (req, res) => {
  const ultimoLogin = req.cookies.ultimoLogin;
  const nomeJogador = req.body.nomeJogador;
  const numeroCamisa = req.body.numeroCamisa;
  const nascimento = req.body.nascimento;
  const altura = req.body.altura;
  const genero = req.body.genero;
  const posicao = req.body.posicao;
  const equipe = req.body.equipe;

  let opcoesTimes = "";
  for (let i = 0; i < listaTimes.length; i++) {
    let selecionado = listaTimes[i].nomeEquipe === equipe ? "selected" : "";
    opcoesTimes += `<option value="${listaTimes[i].nomeEquipe}" ${selecionado}>${listaTimes[i].nomeEquipe}</option>`;
  }

  if (nomeJogador && numeroCamisa && nascimento && altura && genero && posicao && equipe) {
    for (let i = 0; i < listaTimes.length; i++) {
      if (listaTimes[i].nomeEquipe === equipe) {
        if (!listaTimes[i].jogadores) {
          listaTimes[i].jogadores = [];
        }

        if (listaTimes[i].jogadores.length >= 6) {
          let conteudo = `
          <!DOCTYPE html>
          <html lang="pt-br">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cadastrar Jogador</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
            <style>
              body {
                background: linear-gradient(to right, #1e3c72, #2a5298);
                color: black;
                font-family: 'Poppins', sans-serif;
              }
              .navbar {
                background: #152642;
              }
              .navbar-brand, .nav-link {
                color: white !important;
              }
              .nav-link:hover {
                text-decoration: underline;
              }
              .form-container {
                margin-top: 80px;
              }
              .card-custom {
                background: #fff;
                border-radius: 20px;
                padding: 30px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
              }
              .btn-custom {
                background-color: #1e3c72;
                color: white;
                border: none;
                border-radius: 10px;
              }
              .btn-custom:hover {
                background-color: #1e3c72;
                color: white;
              }
              .navbar-toggler {
                border: 1px solid white;
              }
            </style>
          </head>
          <body>
            <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">Sistema de Times</a>
              <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarConteudo">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
                  <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
                  <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
                </ul>
                <ul class="navbar-nav">
                  <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>

            <div class="container form-container">
              <div class="card-custom">
                <h3>Cadastrar Jogador</h3>
                <form method="POST" action="/cadastrarJogador">
                  <div class="mb-3">
                    <label class="form-label">Nome do Jogador</label>
                    <input type="text" class="form-control" name="nomeJogador" value="${nomeJogador || ''}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Número da Camisa</label>
                    <input type="number" class="form-control" name="numeroCamisa" value="${numeroCamisa || ''}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Data de Nascimento</label>
                    <input type="date" class="form-control" name="nascimento" value="${nascimento || ''}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Altura(cm)</label>
                    <input type="number" class="form-control" name="altura" value="${altura || ''}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Gênero</label>
                    <select class="form-select" name="genero">
                      <option value="">Selecione</option>
                      <option value="Masculino" ${genero === "Masculino" ? "selected" : ""}>Masculino</option>
                      <option value="Feminino" ${genero === "Feminino" ? "selected" : ""}>Feminino</option>
                      <option value="Outro" ${genero === "Outro" ? "selected" : ""}>Outro</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Posição</label>
                    <input type="text" class="form-control" name="posicao" value="${posicao || ''}">
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Equipe</label>
                    <select class="form-select" name="equipe">
                      <option value="">Selecione</option>
                      ${opcoesTimes}
                    </select>
                  </div>

                  <!-- Erro de limite -->
                  <p class="text-danger">O time "${equipe}" já tem 6 jogadores.</p>

                  <button type="submit" class="btn btn-custom">Cadastrar</button>
                  <a href="/" class="btn btn-secondary">Voltar</a>
                </form>
              </div>
            </div>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
          </body>
          </html>
          `;
          return res.send(conteudo);
        }

        
        const jogador = {
          nomeJogador,
          numeroCamisa,
          nascimento,
          altura,
          genero,
          posicao
        };
        listaTimes[i].jogadores.push(jogador);
        listaJogadores.push({ ...jogador, equipe });

        res.redirect("/listarJogadores");
        return;
      }
    }
  } else {
    let conteudo = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Cadastrar Jogador</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
      <style>
        body {
          background: linear-gradient(to right, #1e3c72, #2a5298);
          color: black;
          font-family: 'Poppins', sans-serif;
        }
        .navbar {
          background: #152642;
        }
        .navbar-brand, .nav-link {
          color: white !important;
        }
        .nav-link:hover {
          text-decoration: underline;
        }
        .form-container {
          margin-top: 80px;
        }
        .card-custom {
          background: #fff;
          border-radius: 20px;
          padding: 30px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .btn-custom {
          background-color: #1e3c72;
          color: white;
          border: none;
          border-radius: 10px;
        }
        .btn-custom:hover {
          background-color: #1e3c72;
          color: white;
        }
        .navbar-toggler {
          border: 1px solid white;
        }
      </style>
    </head>
    <body>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">Sistema de Times</a>
          <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarConteudo">
            <ul class="navbar-nav me-auto">
              <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
              <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
              <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
              <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
              <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container form-container">
        <div class="card-custom">
          <h3>Cadastrar Jogador</h3>
          <form method="POST" action="/cadastrarJogador">
            <div class="mb-3">
              <label class="form-label">Nome do Jogador</label>
              <input type="text" class="form-control" name="nomeJogador" value="${nomeJogador || ''}">
              ${!nomeJogador ? '<span class="text-danger">Informe o nome do jogador</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Número da Camisa</label>
              <input type="number" class="form-control" name="numeroCamisa" value="${numeroCamisa || ''}">
              ${!numeroCamisa ? '<span class="text-danger">Informe o número da camisa</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Data de Nascimento</label>
              <input type="date" class="form-control" name="nascimento" value="${nascimento || ''}">
              ${!nascimento ? '<span class="text-danger">Informe a data de nascimento</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Altura(cm)</label>
              <input type="number" class="form-control" name="altura" value="${altura || ''}">
              ${!altura ? '<span class="text-danger">Informe a altura</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Gênero</label>
              <select class="form-select" name="genero">
                <option value="">Selecione</option>
                <option value="Masculino" ${genero === "Masculino" ? "selected" : ""}>Masculino</option>
                <option value="Feminino" ${genero === "Feminino" ? "selected" : ""}>Feminino</option>
                <option value="Outro" ${genero === "Outro" ? "selected" : ""}>Outro</option>
              </select>
              ${!genero ? '<span class="text-danger">Selecione o gênero</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Posição</label>
              <input type="text" class="form-control" name="posicao" value="${posicao || ''}">
              ${!posicao ? '<span class="text-danger">Informe a posição</span>' : ''}
            </div>
            <div class="mb-3">
              <label class="form-label">Equipe</label>
              <select class="form-select" name="equipe">
                <option value="" disabled>Selecione</option>
                ${opcoesTimes}
              </select>
              ${!equipe ? '<span class="text-danger">Selecione a equipe</span>' : ''}
            </div>
            <button type="submit" class="btn btn-custom">Cadastrar</button>
            <a href="/" class="btn btn-secondary">Voltar</a>
          </form>
        </div>
      </div>
       <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;

    res.send(conteudo);
  }
});

app.get("/listarJogadores", verificarAutenticacao, (req, res) => {
    let tabela = "";
    const ultimoLogin = req.cookies.ultimoLogin;

    if (listaJogadores.length > 0) {
        for (let t of listaJogadores) {
            tabela += `
                <tr>
                    <td>${t.nomeJogador}</td>
                    <td>${t.numeroCamisa}</td>
                    <td>${t.nascimento}</td>
                    <td>${t.altura}</td>
                    <td>${t.genero}</td>
                    <td>${t.posicao}</td>
                    <td>${t.equipe}</td>
                </tr>
            `;
        }
    } else {
        tabela = `<tr><td colspan="7" class="text-center">Nenhum jogador cadastrado ainda.</td></tr>`;
    }

    res.send(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Listar Times</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet">
            <style>
                body {
                    background: linear-gradient(to right, #1e3c72, #2a5298);
                    font-family: 'Poppins', sans-serif;
                }
                .navbar {
                  background: #152642;
                }
                .navbar-brand, .nav-link {
                  color: white !important;
                }
                .nav-link:hover {
                  text-decoration: underline;
                }
                .table-container {
                    margin-top: 80px;
                }
                .btn-custom {
                    background: #152642;
                    color: white;
                    border-radius: 10px;
                    border: none;
                }
                .btn-custom:hover {
                    background: #152642;
                    color: white;
                }
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg">
            <div class="container-fluid">
              <a class="navbar-brand" href="/">Sistema de Times</a>
              <button class="navbar-toggler text-white border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarConteudo" aria-controls="navbarConteudo" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarConteudo">
                <ul class="navbar-nav me-auto">
                  <li class="nav-item"><a class="nav-link" href="/cadastrarTime">Cadastrar Time</a></li>
                  <li class="nav-item"><a class="nav-link" href="/cadastrarJogador">Cadastrar Jogador</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarTimes">Listar Times</a></li>
                  <li class="nav-item"><a class="nav-link" href="/listarJogadores">Listar Jogadores</a></li>
                  <li class="nav-item"><span class="nav-link">${ultimoLogin?"Ultimo login: " + ultimoLogin:""}</span></li>
                </ul>
                <ul class="navbar-nav">
                  <li class="nav-item"><a class="nav-link text-warning" href="/logout">Logout</a></li>
                </ul>
              </div>
            </div>
          </nav>

            <div class="container table-container">
                <h3 class="text-white">Jogadores Cadastrados</h3>
                <div class="table-responsive">
                <table class="table table-bordered table-hover">
                    <thead class="table-light">
                        <tr>
                            <th>Nome jogador</th>
                            <th>N° camisa</th>
                            <th>Data de nascimento</th>
                            <th>Altura em cm</th>
                            <th>Gênero</th>
                            <th>Posição</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tabela}
                    </tbody>
                </table>
                </div>
                <div class="text-center mt-3">
                    <a href="/cadastrarJogador" class="btn btn-custom">Cadastrar Jogador</a>
                </div>
            </div>
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </body>
        </html>
    `);
});

function verificarAutenticacao(req, res, next) {  
    if (req.session.logado){
        next();
    }
    else{
        res.redirect("/login");
    }
}


app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/login");
});


app.listen(port, host, () => {
    console.log(`Servidor em execução em http://localhost:${port}/`);
});
