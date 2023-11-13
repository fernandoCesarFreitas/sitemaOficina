import { NextFunction, Response, Request, Router } from "express";
import * as yup from 'yup';
import { MetodoDePagamentoController } from "../controller/MetodoDePagamentoController";
import { MetodoDePagamento } from "../models/MetodoDePagamento";

let controller: MetodoDePagamentoController = new MetodoDePagamentoController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        nome: yup.string().min(3).max(255).required(),
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

    let MetodosDePagamentos: MetodoDePagamento | null = await MetodoDePagamento.findOneBy({ id });

    if (!MetodosDePagamentos) {
        return res.status(422).json({ error: "Servico não encontrado" });
    }
    res.locals.MetodosDePagamentos = MetodosDePagamentos;

    return next();
}

let rotas: Router = Router();

rotas.get("/MetodosDePagamentos", controller.list);

rotas.get("/MetodosDePagamentos/:id", validar, controller.find);

rotas.post("/MetodosDePagamentos", validarPayload, controller.create);

rotas.put("/MetodosDePagamentos/:id", validar, validarPayload, controller.update);

rotas.delete("/MetodosDePagamentos/:id", validar, controller.delete);

export default rotas;