import { NextFunction, Response, Request, Router } from "express";
import { TipoServicoController } from "../controller/TipoServicosController";
import { TipoServico } from "../models/TipoServico";
import * as yup from 'yup';

let controller: TipoServicoController = new TipoServicoController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        descricao: yup.string().min(3).max(255).required(),
        valor: yup.number().required(),
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

    let tipoServico: TipoServico | null = await TipoServico.findOneBy({ id });

    if (!tipoServico) {
        return res.status(422).json({ error: "Servico não encontrado" });
    }
    res.locals.tipoServico = tipoServico;

    return next();
}

let rotas: Router = Router();

rotas.get("/tipoServico", controller.list);

rotas.get("/tipoServico/:id", validar, controller.find);

rotas.post("/tipoServico", validarPayload, controller.create);

rotas.put("/tipoServico/:id", validar, validarPayload, controller.update);

rotas.delete("/tipoServico/:id", validar, controller.delete);

export default rotas;