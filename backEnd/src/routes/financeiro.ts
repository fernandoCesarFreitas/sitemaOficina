import { NextFunction, Response, Request, Router } from "express";
import { FinanceiroController } from "../controller/FinanceiroController";
import { Financeiro } from "../models/Financeiro";

let controller: FinanceiroController = new FinanceiroController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let financeiro: Financeiro | null = await Financeiro.findOneBy({ id });

    if (!financeiro) {
        return res.status(422).json({ error: "Cliente não encontrado" });
    }
    res.locals.financeiro = financeiro;

    return next();
}

let rotas: Router = Router();

rotas.get("/financeiro", controller.list);

rotas.get("/financeiro/:id", validar, controller.find);

rotas.post("/financeiro", controller.create);

rotas.put("/financeiro/:id", validar, controller.update);

rotas.delete("/financeiro/id", validar, controller.delete);

export default rotas;