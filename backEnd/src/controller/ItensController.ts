import { Request, Response } from "express";
import { Itens } from "../models/Itens";

export class ItensController {


    async list(req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;
    
        let itens: Itens[] = await Itens.find({
          where: { status: "Ativo" },
        });
        return res.status(200).json(itens);
      }


    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let nome = body.nome;
        let marca = body.marca;
        let valor = body.valor;
        let quantidade = body.quantidade;
        let status = "Ativo";

        let item: Itens = await Itens.create({
            nome,
            marca,
            valor,
            quantidade,
            status,
        }).save();

        return res.status(200).json(item);
    }


    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let itens: Itens = res.locals.itens;

        let nome = body.nome;
        let marca = body.marca;
        let valor = body.valor;
        let quantidade = body.quantidade;
        let status = 'Ativo';

        itens.nome = nome;
        itens.marca = marca;
        itens.valor = valor;
        itens.quantidade = quantidade;
        itens.status = status;
        await itens.save();

        return res.status(200).json(itens);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let itens: Itens = res.locals.itens;

        itens.status = 'Inativo';
        await itens.save();

        return res.status(200).json(itens);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let itens: Itens = res.locals.itens;
        return res.status(200).json(itens);
    }
}