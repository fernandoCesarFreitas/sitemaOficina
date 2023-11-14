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
        let metodoDePagamento: MetodoDePagamento = res.locals.metodosDePagamentos;
        return res.status(200).json(metodoDePagamento);
    }



    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        console.log(body)
        let metodoDePagamento: MetodoDePagamento = res.locals.metodosDePagamentos;
        console.log('CHEGOU AQUI')
            console.log(metodoDePagamento)
        if (!metodoDePagamento) {
            return res.status(400).json({ mensagem: "MetodoDePagamento não encontrada" });
        }

        let nome = body.nome;

        metodoDePagamento.nome = nome;
        await metodoDePagamento.save();
        console.log(metodoDePagamento)
        return res.status(200).json(metodoDePagamento);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        console.log('CHEGOU AQUI')
        let metodoDePagamento: MetodoDePagamento = res.locals.metodosDePagamentos;
        console.log(metodoDePagamento)

        if (!metodoDePagamento) {
            return res.status(400).json({ mensagem: "MetodoDePagamento não encontrada" });
        }
    
        metodoDePagamento.situacao = "Inativo";
        await metodoDePagamento.save();
    
        return res.status(200).json(metodoDePagamento);
    }
    

}