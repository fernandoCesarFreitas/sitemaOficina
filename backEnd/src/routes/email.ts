import { EmailController } from './../controller/EmailController';
import { Router, Request, Response, NextFunction } from "express";
import { Clientes } from "../models/Clientes";
import * as yup from 'yup';

let controller: EmailController = new EmailController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        titulo: yup.string().min(5).max(255).required(),
        mensagem: yup.string().min(10).max(255).required(),
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

    let clientes: Clientes | null = await Clientes.findOneBy({ id });

    if (!clientes) {
        return res.status(422).json({ error: "Cliente não encontrado" });
    }
    res.locals.clientes = clientes;

    return next();
}

let rotas: Router = Router();

rotas.post("/email/:id", validar, validarPayload, controller.enviarEmail);

export default rotas;
