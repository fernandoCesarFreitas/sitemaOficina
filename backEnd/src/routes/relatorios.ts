import { Router } from "express";
import { RelatoriosController } from "../controller/RelatoriosController";

let controller: RelatoriosController = new RelatoriosController();

let rotas: Router = Router();

rotas.get('/csv', controller.exportarCsv);

export default rotas;