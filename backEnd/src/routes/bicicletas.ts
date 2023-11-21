import { Router, Request, Response, NextFunction } from "express";
import { BicicletaController } from "../controller/BicicletasController";
import { Bicicleta } from "../models/Bicicletas";
import * as yup from 'yup';

let controller: BicicletaController = new BicicletaController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        modelo: yup.string().min(3).max(255).required(),
        tipo: yup.string().min(3).max(255).required(),
        cor: yup.string().min(3).max(255).required(),
    });

    let payload = req.body;

    try {
        req.body = await schema.validate(payload, { abortEarly: false, stripUnknown: true });

        return next();
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return res.status(400).json({ errors: error.errors });
        }
        return res.status(500).json({ error: 'Ops! Algo deu errado.' });
    }
}

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

rotas.post("/bicicletas", validarPayload, controller.create);

rotas.put("/bicicletas/:id", validar, validarPayload, controller.update);

rotas.delete("/bicicletas/:id", validar, controller.delete);

rotas.get("/bicicletascsv", controller.gerarCSVBikes);

export default rotas;