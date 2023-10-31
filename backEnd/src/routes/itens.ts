import { NextFunction, Response, Request, Router } from "express";
import { ItensController } from "../controller/ItensController";
import { Itens } from "../models/Itens";
import * as yup from 'yup';

let controller: ItensController = new ItensController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        nome: yup.string().min(3).max(255).required(),
        descricao: yup.string().min(3).max(255).required(),
        valor: yup.number().required(),
        quantidade: yup.number().required(),
        maoDeObra: yup.string().min(3).max(255).required(),
        observacoes: yup.string().min(3).max(255).required(),
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

rotas.post("/itens", validarPayload, controller.create);

rotas.put("/itens/:id", validar, validarPayload, controller.update);

rotas.delete("/itens/id", validar, controller.delete);

export default rotas;