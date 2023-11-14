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
            return res.status(400).json({ errors: error.errors+"aki" });
        }
        return res.status(500).json({ error: 'Ops! Algo deu errado.' });
    }
}

async function validar(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let id = Number(req.params.id);
    console.log(id)
    let metodosDePagamentos: MetodoDePagamento | null = await MetodoDePagamento.findOneBy({ id });

    if (!metodosDePagamentos) {
        return res.status(422).json({ error: "Tipo de Pagamento Não encontrado" });
    }
    res.locals.metodosDePagamentos = metodosDePagamentos;
    console.log(metodosDePagamentos)
    return next();
}

let rotas: Router = Router();

rotas.get("/metodosDePagamentos", controller.list);

rotas.get("/metodosDePagamentos/:id", validar, controller.find);

rotas.post("/metodosDePagamentos", validarPayload, controller.create);

rotas.put("/metodosDePagamentos/:id", validar, validarPayload, controller.update);

rotas.delete("/metodosDePagamentos/:id", validar, controller.delete);

export default rotas;