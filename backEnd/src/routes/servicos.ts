import { NextFunction, Response, Request, Router } from "express";
import { ServicosController } from "../controller/ServicosController";
import { Servicos } from "../models/Servicos";

let controller: ServicosController = new ServicosController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let servicos: Servicos | null = await Servicos.findOneBy({ id });

    if (!servicos) {
        return res.status(422).json({ error: "Servico não encontrado" });
    }
    res.locals.servicos = servicos;

    return next();
}

let rotas: Router = Router();

rotas.get("/servicos", controller.list);

rotas.get("/servicos/:id", validar, controller.find);

rotas.post("/servicos", controller.create);

rotas.put("/servicos/:id", validar, controller.update);

rotas.delete("/servicos/id", validar, controller.delete);

export default rotas;