import { AutenticacaoController } from '../controller/AutenticacaoController';
import { Router,} from "express";

let rotas: Router = Router();

let autenticacaoController: AutenticacaoController = new AutenticacaoController();

rotas.post('/login',autenticacaoController.login);

export default rotas;