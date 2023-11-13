import { MetodoDePagamento } from './../models/MetodoDePagamento';
import { Request, Response } from "express";


export class MetodoDePagamentoController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let nome = body.nome;
        let situacao = 'Ativo'

        let metodoDePagamento: MetodoDePagamento = await MetodoDePagamento.create({
            nome: nome,
            situacao: situacao
        }).save();

        return res.status(200).json(metodoDePagamento);
    }
    async list(req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;

        let metodosDePagamentos: MetodoDePagamento[] = await MetodoDePagamento.find({
            where: { situacao: "Ativo" },
        });
        return res.status(200).json(metodosDePagamentos);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let metodoDePagamento: MetodoDePagamento = res.locals.metodoDePagamento;
        return res.status(200).json(metodoDePagamento);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let metodoDePagamento: MetodoDePagamento = res.locals.metodoDePagamento;

        if (!metodoDePagamento) {
            return res.status(400).json({ mensagem: "MetodoDePagamento não encontrada" });
        }

        let nome = body.nome;

        metodoDePagamento.nome = nome;
        await metodoDePagamento.save();

        return res.status(200).json(metodoDePagamento);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let cliente: MetodoDePagamento = res.locals.clientes;
        cliente.situacao = "Inativo";
        await cliente.save();

        return res.status(200).json(cliente);
    }

}