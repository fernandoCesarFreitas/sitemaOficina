import { Request, Response } from "express";
import { TipoServico } from "../models/TipoServico";
import { Bicicleta } from "../models/Bicicletas";
import { Clientes } from "../models/Clientes";
import { Financeiro } from "../models/Financeiro";
import { Servicos } from "../models/Servicos";

export class ServicosController {
    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let dataEntrada = body.dataEntrada;
        let descricao = body.descricao;
        let status = body.status;
        let valor = body.valor;
        let tipoServicoId = body.tipoServicoId;
        let bicicletaId = body.bicicletaId;
        let clienteId = body.clienteId;
        let financeiroId = body.financeiroId;
        let itensUtilizadosId = body.itensUtilizadosId;


        //Buscando os relacionamentos
        let tipoServico = await TipoServico.findOneBy({ id: tipoServicoId });
        let bicicleta = await Bicicleta.findOneBy({ id: bicicletaId });
        let cliente = await Clientes.findOneBy({ id: clienteId });
        let financeiro = await Financeiro.findOneBy({ id: financeiroId });

        if (!tipoServico) {
            return res.status(400).json({ mensagem: "Serviço não encontrado" })
        }
        if (!bicicleta) {
            return res.status(400).json({ mensagem: "Bicicleta não encontrada" })
        }
        if (!cliente) {
            return res.status(400).json({ mensagem: "Cliente não encontrado" })
        }
        if (!financeiro) {
            return res.status(400).json({ mensagem: "Financeiro não encontrado" })
        }


        let servico: Servicos = await Servicos.create({
            dataEntrada: dataEntrada,
            descricao: descricao,
            status: status,
            valor: valor,
            bicicleta: bicicleta,
            tipoServico: tipoServico,
            cliente: cliente,
            financeiro: financeiro,
            itensUtilizados: itensUtilizadosId,
        }).save()

        return res.status(200).json(servico);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let servicos: Servicos[] = await Servicos.find()

        return res.status(200).json(servicos);
    }

    // async find(req: Request, res: Response): Promise<Response> {
    // let servico
    // return res.status(200);
    // }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let servico: Servicos | null = await Servicos.findOneBy({ id: body.servicoId })

        if (!servico) {
            return res.status(400).json({ mensagem: "Serviço não encontrado" })
        }

        let dataEntrada = body.dataEntrada;
        let descricao = body.descricao;
        let status = body.status;
        let valor = body.valor;
        let tipoServicoId = body.tipoServicoId;
        let bicicletaId = body.bicicletaId;
        let clienteId = body.clienteId;
        let financeiroId = body.financeiroId;
        let itensUtilizadosId = body.itensUtilizadosId;


        //Buscando os relacionamentos
        let tipoServico = await TipoServico.findOneBy({ id: tipoServicoId });
        let bicicleta = await Bicicleta.findOneBy({ id: bicicletaId });
        let cliente = await Clientes.findOneBy({ id: clienteId });
        let financeiro = await Financeiro.findOneBy({ id: financeiroId });

        if (!tipoServico || tipoServico.status == 'Inátivo') {
            return res.status(400).json({ mensagem: "Serviço não encontrado" })
        }
        if (!bicicleta || bicicleta.status == 'Inátivo') {
            return res.status(400).json({ mensagem: "Bicicleta não encontrada" })
        }
        if (!cliente || cliente.status == 'Inátivo') {
            return res.status(400).json({ mensagem: "Cliente não encontrado" })
        }
        if (!financeiro) {
            return res.status(400).json({ mensagem: "Financeiro não encontrado" })
        }

        servico.dataEntrada = dataEntrada,
        servico.descricao = descricao,
        servico.status = status,
        servico.valor = valor,
        servico.bicicleta = bicicleta,
        servico.tipoServico = tipoServico,
        servico.cliente = cliente,
        servico.financeiro = financeiro,
        servico.itensUtilizados = itensUtilizadosId,
        await servico.save()


        return res.status(200);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let servico: Servicos | null = await Servicos.findOneBy({ id: body.servicoId })

        if (!servico) {
            return res.status(400).json({ mensagem: "Serviço não encontrado" })
        }

        servico.status = 'Concluído'

        await servico.save()


        return res.status(200);
    }
}