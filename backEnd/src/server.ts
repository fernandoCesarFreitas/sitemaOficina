import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import usuariosRoutes from './routes/usuarios'

let server: Express = express();
let port: Number = Number(process.env.server_port || 3000);

server.use(cors());
server.use(express.json());

server.use((req:Request, res:Response, next: NextFunction)=>{
  console.log('['+(new Date)+ ']'+req.method +' '+req.url);
  next();
});

//chama a rota de usuarios
// server.use(autenticacaoRoutes);
server.use(usuariosRoutes);//basicAuth,

//iniciar servidor
export default {
  start() {
    server.listen(port, () => {
      console.log("servidor iniciado na porta 3000");
    });
  },
};
