import { ClientesController } from './../controller/ClientesController';
import { Router, Request, Response, NextFunction } from "express";
import { Clientes } from "../models/Clientes";
import * as yup from 'yup';

let controller: ClientesController = new ClientesController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        nome: yup.string().min(3).max(255).required(),
        email: yup.string().min(3).max(255).required(),
        telefone: yup.string().min(8).max(20).required(),
        cpf: yup.string().min(11).max(14).required(),
        endereco: yup.string().min(3).max(255).required(),
        cidade: yup.string().min(3).max(255).required(),
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

rotas.get("/clientes:id", controller.list);

rotas.get("/clientes/:id", validar, controller.find);

rotas.post("/clientes", validarPayload, controller.create);

rotas.put("/clientes/:id", validar, validarPayload, controller.update);

rotas.delete("/clientes/:id", validar, controller.delete);

export default rotas;