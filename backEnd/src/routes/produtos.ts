import { Router } from "express";
import { ProdutosController } from "../controller/ProdutosController";
let produtosController: ProdutosController = new ProdutosController();

let rotas :Router = Router();

rotas.get("/produtos", produtosController.list);

rotas.get("/produtos/:id", produtosController.find);

rotas.post("/produtos", produtosController.create);

rotas.put("/produtos/:id", produtosController.update);

rotas.delete("/produtos/id", produtosController.delete);

export default rotas;