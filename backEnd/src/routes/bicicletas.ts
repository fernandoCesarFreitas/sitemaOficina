import { Router, Request, Response, NextFunction } from "express";
import { BicicletaController } from "../controller/BicicletasController";
import { Bicicleta } from "../models/Bicicletas";

let controller: BicicletaController = new BicicletaController();

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);

    let bicicleta: Bicicleta | null = await Bicicleta.findOneBy({ id });

    if (!bicicleta) {
        return res.status(422).json({ error: "Bicicleta não encontrada" });
    }
    res.locals.bicicleta = bicicleta;

    return next();
}

let rotas: Router = Router();

rotas.get("/bicicletas", controller.list);

rotas.get("/bicicletas/:id", validar, controller.find);

rotas.post("/bicicletas", controller.create);

rotas.put("/bicicletas/:id", validar, controller.update);

rotas.delete("/bicicletas/:id", validar, controller.delete);

export default rotas;