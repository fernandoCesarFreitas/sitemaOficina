import { NextFunction, Response, Request, Router } from "express";
import { ItensController } from "../controller/ItensController";
import { Itens } from "../models/Itens";

let controller: ItensController = new ItensController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let itens: Itens | null = await Itens.findOneBy({ id });

    if (!itens) {
        return res.status(422).json({ error: "Item não encontrado" });
    }
    res.locals.itens = itens;

    return next();
}

let rotas: Router = Router();

rotas.get("/itens", controller.list);

rotas.get("/itens/:id", validar, controller.find);

rotas.post("/itens", controller.create);

rotas.put("/itens/:id", validar, controller.update);

rotas.delete("/itens/id", validar, controller.delete);

export default rotas;