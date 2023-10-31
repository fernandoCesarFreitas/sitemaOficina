import { Request, Response } from "express";
import { Bicicleta } from "../models/Bicicletas";

export class BicicletaController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let modelo = body.modelo;
        let tipo = body.tipo;
        let cor = body.cor;
        let status = 'Ativo';

        let bicicleta: Bicicleta = await Bicicleta.create({
            modelo,
            tipo,
            cor,
            status,
        }).save()

        return res.status(200).json(bicicleta);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let bicicletas: Bicicleta[] = await Bicicleta.find();

        return res.status(200).json(bicicletas);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let bicicleta: Bicicleta = res.locals.bicicleta;

        if (!bicicleta) {
            return res.status(400).json({ mensagem: "Bicicleta não encontrada" });
        }

        let modelo = body.modelo;
        let tipo = body.tipo;
        let cor = body.cor;
        let status = 'Ativo';

        bicicleta.modelo = modelo;
        bicicleta.tipo = tipo;
        bicicleta.cor = cor;
        bicicleta.status = status;
        await bicicleta.save();

        return res.status(200);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let bicicleta: Bicicleta = res.locals.bicicleta;

        if (!bicicleta) {
            return res.status(400).json({ mensagem: "Bicicleta não encontrada" });
        }

        bicicleta.status = 'Inativo';
        await bicicleta.save();

        return res.status(200).json(bicicleta);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let bicicleta: Bicicleta = res.locals.bicicleta;
        return res.status(200).json(bicicleta);
    }
}