import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import usuariosRoutes from './routes/usuarios'
import bicicletasRoutes from './routes/bicicletas'
import clientesRoutes from './routes/clientes'
import financeiroRoutes from './routes/financeiro'
import itemRoutes from './routes/itens'
import autenticacaoRoutes from './routes/autenticacao'
import servicoRoutes from './routes/servicos'
import tiposervicoRoutes from './routes/tipoServicos'
import emailRoutes from './routes/email';

let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

server.use((req: Request, res: Response, next: NextFunction) => {
  console.log('[' + (new Date) + ']' + req.method + ' ' + req.url);
  next();
});

//chama a rota de usuarios
server.use(autenticacaoRoutes);
server.use(usuariosRoutes);//basicAuth,
server.use(bicicletasRoutes);//basicAuth,
server.use(clientesRoutes);//basicAuth,
server.use(financeiroRoutes);//basicAuth,
server.use(itemRoutes);//basicAuth,
server.use(servicoRoutes);//basicAuth,
server.use(tiposervicoRoutes);//basicAuth,
server.use(emailRoutes);//basicAuth,

//iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log(`servidor iniciado na porta ${port}`);
    });
  },
};
