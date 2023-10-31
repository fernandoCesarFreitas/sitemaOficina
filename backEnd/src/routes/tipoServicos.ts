import { NextFunction, Response, Request, Router } from "express";
import { TipoServicoController } from "../controller/TipoServicosController";
import { TipoServico } from "../models/TipoServico";

let controller: TipoServicoController = new TipoServicoController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let tipoServico: TipoServico | null = await TipoServico.findOneBy({ id });

    if (!tipoServico) {
        return res.status(422).json({ error: "Servico não encontrado" });
    }
    res.locals.tipoServico = tipoServico;

    return next();
}

let rotas: Router = Router();

rotas.get("/tipoServico", controller.list);

rotas.get("/tipoServico/:id", validar, controller.find);

rotas.post("/tipoServico", controller.create);

rotas.put("/tipoServico/:id", validar, controller.update);

rotas.delete("/tipoServico/id", validar, controller.delete);

export default rotas;