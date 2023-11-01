import { NextFunction, Response, Request, Router } from "express";
import { FinanceiroController } from "../controller/FinanceiroController";
import { Financeiro } from "../models/Financeiro";
import * as yup from 'yup';

let controller: FinanceiroController = new FinanceiroController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        valor: yup.number().required(),
        metodoDePagamento: yup.string().min(3).max(255).required(),
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

rotas.post("/financeiro", validarPayload, controller.create);

rotas.put("/financeiro/:id", validar, validarPayload, controller.update);

rotas.delete("/financeiro/id", validar, controller.delete);

export default rotas;