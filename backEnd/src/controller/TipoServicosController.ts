import { Request, Response } from "express";
import { TipoServico } from "../models/TipoServico";

export class TipoServicoController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let descricao = body.descricao;
        let valor = body.valor
        let status = "Ativo"

        let tipoServico: TipoServico = await TipoServico.create({
            descricao,
            valor,
            status,
        }).save();

        return res.status(200).json(tipoServico);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let tiposServico: TipoServico[] = await TipoServico.find();

        return res.status(200).json(tiposServico);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let tipoServico: TipoServico | null = await TipoServico.findOneBy({ id: body.id });

        if (!tipoServico) {
            return res.status(200).json({ mensagem: "Tipo de serviço não encontrado" })
        }

        tipoServico.descricao = body.descricao;
        tipoServico.valor = body.valor;
        await tipoServico.save();

        return res.status(200).json(tipoServico);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;
        let tipoServico: TipoServico | null = await TipoServico.findOneBy({ id: body.id });

        if (!tipoServico) {
            return res.status(200).json({ mensagem: "Tipo de serviço não encontrado" })
        }

        tipoServico.status = 'Inativo';
        await tipoServico.save();

        return res.status(200).json(tipoServico);
    }
}