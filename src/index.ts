import express from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import jwtAuthentication from './middlewares/jwt-authentication.middleware';

const app = express();
const host = 'http://localhost';
const port = 3000;

// Configurações da aplicação
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurações de Rotas
app.use(statusRoute);
app.use(authorizationRoute);

app.use(jwtAuthentication);
app.use(usersRoute);

// Configuração dos Handlers de Erro
app.use(errorHandler);

// Inicialização do servidor
app.listen(port, () => {
  console.log(`Server is running at ${host}:${port}`);
});