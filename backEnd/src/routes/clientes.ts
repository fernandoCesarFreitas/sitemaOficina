import { ClientesController } from './../controller/ClientesController';
import { Router, Request, Response, NextFunction } from "express";
import { Clientes } from "../models/Clientes";

let controller: ClientesController = new ClientesController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let clientes: Clientes | null = await Clientes.findOneBy({ id });

    if (!clientes) {
        return res.status(422).json({ error: "Cliente não encontrado" });
    }
    res.locals.clientes = clientes;

    return next();
}

let rotas: Router = Router();

rotas.get("/clientes:id", controller.list);

rotas.get("/clientes/:id", validar, controller.find);

rotas.post("/clientes", controller.create);

rotas.put("/clientes/:id", validar, controller.update);

rotas.delete("/clientes/:id", validar, controller.delete);

export default rotas;