import { Request, Response } from "express";
import { Financeiro } from "../models/Financeiro";
import { Servicos } from "../models/Servicos";

export class FinanceiroController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let valor = body.valor;
        let metodoDePagamento = body.metodoDePagamento;
        let status = "Ativo";
        let servicos: Servicos | null = await Servicos.findOneBy({ id: body.servicoId });

        if (!servicos) {
            return res.status(400).json({ mensagem: "Serviço não encontrado" })
        }
        let financeiro: Financeiro = await Financeiro.create({
            status,
            valor,
            metodoDePagamento,
            servicosRealizados: servicos
        }).save();

        return res.status(200).json(financeiro);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let financeiros: Financeiro[] = await Financeiro.find();

        return res.status(200).json(financeiros);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let financeiro: Financeiro = res.locals.financeiro;

        if (!financeiro) {
            return res.status(400).json({ mensagem: "Ordem do financeiro não encontrado" })
        }

        let data = body.data;
        let valor = body.valor;
        let metodoDePagamento = body.metodoDePagamento;
        let status = "Ativo";

        financeiro.data = data;
        financeiro.valor = valor;
        financeiro.metodoDePagamento = metodoDePagamento;
        financeiro.status = status;
        await financeiro.save();

        return res.status(200).json(financeiro);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let financeiro: Financeiro = res.locals.financeiro;

        if (!financeiro) {
            return res.status(400).json({ mensagem: "Ordem do financeiro não encontrado" })
        }

        let status = "Inativo";

        financeiro.status = status;
        await financeiro.save();

        return res.status(200).json(financeiro);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let financeiro: Financeiro = res.locals.financeiro;
        return res.status(200).json(financeiro);
    }
}