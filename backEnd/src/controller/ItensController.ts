import { Request, Response } from "express";
import { Itens } from "../models/Itens";

export class ItensController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let nome = body.nome;
        let descricao = body.descricao;
        let valor = body.valor;
        let quantidade = body.quantidade;
        let maoDeObra = body.maoDeObra;
        let observacoes = body.observacoes;
        let status = "Ativo";

        let item: Itens = await Itens.create({
            nome,
            descricao,
            valor,
            quantidade,
            maoDeObra,
            observacoes,
            status,
        }).save();

        return res.status(200).json(item);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let itens: Itens[] = await Itens.find();

        return res.status(200).json(itens);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let itens: Itens = res.locals.itens;

        let nome = body.nome;
        let descricao = body.descricao;
        let valor = body.valor;
        let quantidade = body.quantidade;
        let maoDeObra = body.maoDeObra;
        let observacoes = body.observacoes;
        let status = 'Ativo';

        itens.nome = nome;
        itens.descricao = descricao;
        itens.valor = valor;
        itens.quantidade = quantidade;
        itens.maoDeObra = maoDeObra;
        itens.observacoes = observacoes;
        itens.status = status;
        await itens.save();

        return res.status(200).json(itens);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let itens: Itens = res.locals.itens;

        itens.status = 'Inativo';
        await itens.save();

        return res.status(200);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let itens: Itens = res.locals.itens;
        return res.status(200).json(itens);
    }
}