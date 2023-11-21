import { NextFunction, Response, Request, Router } from "express";
import { ServicosController } from "../controller/ServicosController";
import { PDFController } from "../controller/PDFController";
import { Servicos } from "../models/Servicos";
import * as yup from 'yup';

let controller: ServicosController = new ServicosController();
let pdf: PDFController = new PDFController();

async function validarPayload(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let schema = yup.object({
        descricao: yup.string().min(3).max(255).required(),
        dataSaida: yup.mixed().nullable(),
        valor: yup.number().required(),
        observacao: yup.string().nullable(),
        bicicletaId: yup.number().required(),
        itensUtilizadosId: yup.number().required(),
        clienteId: yup.number().required(),
    });

    let payload = req.body;
    console.log(payload);

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

    let servicos: Servicos | null = await Servicos.findOneBy({ id });

    if (!servicos) {
        return res.status(422).json({ error: "Servico não encontrado" });
    }
    res.locals.servicos = servicos;

    return next();
}

let rotas: Router = Router();

rotas.get("/servicos", controller.list);

rotas.get("/servicosConcluidos", controller.listConcluidos);

rotas.get("/servicos/:id", validar, controller.find);

rotas.post("/servicos", validarPayload, controller.create);

rotas.put("/servicos/:id", validar, validarPayload, controller.update);

rotas.delete("/servicos/:id", validar, controller.delete);

rotas.delete("/servicosConcluidos/:id", validar, controller.concluido);

rotas.get("/pdf", pdf.downloadPdf);

rotas.get("/servicoscsv", controller.gerarCSVServicos);

export default rotas;