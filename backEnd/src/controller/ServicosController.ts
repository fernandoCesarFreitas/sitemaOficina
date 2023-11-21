import { Request, Response } from "express";
import { Bicicleta } from "../models/Bicicletas";
import { Clientes } from "../models/Clientes";
import { Financeiro } from "../models/Financeiro";
import { Servicos } from "../models/Servicos";
import { Itens } from "../models/Itens";
import { format } from "date-fns";

import { EmailController } from "./EmailController";

let email: EmailController = new EmailController();
//adicionar campo obsservacoes

export class ServicosController {
  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    console.log(body);
    let descricao = body.descricao;
    let status = "Ativo";
    let valor = body.valor;
    let bicicletaId = body.bicicletaId;
    let clienteId = body.clienteId;
    let itensUtilizadosId = body.itensUtilizadosId;

    //Buscando os relacionamentos
    let bicicleta = await Bicicleta.findOneBy({ id: bicicletaId });
    let cliente = await Clientes.findOneBy({ id: clienteId });
    let itens = await Itens.findOneBy({ id: itensUtilizadosId });

    if (!bicicleta) {
      return res.status(400).json({ mensagem: "Bicicleta não encontrada" });
    }
    if (!cliente) {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }
    if (!itens) {
      return res.status(400).json({ mensagem: "Item não encontrado" });
    }
    // Verificando e atualizando a quantidade do item
    if (itens.quantidade > 0) {
      itens.quantidade -= 1; // Você pode ajustar isso conforme necessário
      await itens.save(); // Salvando a atualização da quantidade
    } else {
      return res
        .status(400)
        .json({ mensagem: "Quantidade insuficiente do item" });
    }

    let servico: Servicos = await Servicos.create({
      descricao: descricao,
      status: status,
      valor: valor,
      bicicleta: bicicleta,
      cliente: cliente,
      itensUtilizados: itens,
    }).save();

    return res.status(200).json(servico);
  }

  async list(req: Request, res: Response): Promise<Response> {
    let servicos: Servicos[] = await Servicos.find({
      where: { status: "Ativo" },
    });

    return res.status(200).json(servicos);
  }

  // async find(req: Request, res: Response): Promise<Response> {
  // let servico
  // return res.status(200);
  // }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let servico: Servicos = res.locals.servicos;

    if (!servico) {
      return res.status(400).json({ mensagem: "Serviço não encontrado" });
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
    let bicicleta = await Bicicleta.findOneBy({ id: bicicletaId });
    let cliente = await Clientes.findOneBy({ id: clienteId });
    // let financeiro = await Financeiro.findOneBy({ id: financeiroId });
    let itens = await Itens.findOneBy({ id: itensUtilizadosId });

    if (!bicicleta || bicicleta.status == "Inativo") {
      return res.status(400).json({ mensagem: "Bicicleta não encontrada" });
    }
    if (!cliente || cliente.status == "Inativo") {
      return res.status(400).json({ mensagem: "Cliente não encontrado" });
    }
    // if (!financeiro) {
    //     return res.status(400).json({ mensagem: "Financeiro não encontrado" })
    // }
    if (!itens || itens.quantidade < 1 || itens.status == "Inativo") {
      return res
        .status(400)
        .json({ mensagem: "Item não encontrado ou quantidade insuficiente" });
    }

    // servico.dataEntrada = dataEntrada,
    (servico.descricao = descricao),
      (servico.status = status),
      (servico.valor = valor),
      (servico.bicicleta = bicicleta),
      (servico.cliente = cliente),
      (servico.itensUtilizados = itens),
      await servico.save();

    return res.status(200).json(servico);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let servico: Servicos = res.locals.servicos;

    if (!servico) {
      return res.status(400).json({ mensagem: "Serviço não encontrado" });
    }
    const dataAtual = new Date();
    const dataFormatada = format(dataAtual, "dd/MM/yyyy");

    servico.status = "Inativo";

    await servico.save();

    return res.status(200).json(servico);
  }

  async concluido(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let servico: Servicos = res.locals.servicos;

    if (!servico) {
      return res.status(400).json({ mensagem: "Serviço não encontrado" });
    }
    const dataAtual = new Date();
    const dataFormatada = format(dataAtual, "dd/MM/yyyy");

    servico.status = "Concluído";

    servico.dataSaida = dataFormatada;
    console.log(servico.dataSaida);
    await servico.save();
    let cliente = servico.cliente;
    let titulo =
      "Sua Bicicleta está pronta, Oficina do seu João agradece sua preferência";
    let mensagem = `Sua bicicleta está pronta. Foram realizados os seguintes serviços: ${servico.descricao}. Agradecemos sua preferência!`;

    email.emailAutomaticco(cliente, titulo, mensagem);

    return res.status(200).json(servico);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let servicos: Servicos = res.locals.servicos;
    return res.status(200).json(servicos);
  }

  async listConcluidos(req: Request, res: Response): Promise<Response> {
    let servicos: Servicos[] = await Servicos.find({
      where: { status: "Concluído" },
    });

    return res.status(200).json(servicos);
  }

  async gerarCSVServicos(req: Request, res: Response): Promise<void> {
    try {
      const servicos: Servicos[] = await Servicos.find(); // Substitua pelo método de busca apropriado

      if (servicos.length === 0) {
        res.status(404).json({ mensagem: "Nenhum Serviço encontrado." });
      }

      let csv = '"ID";"Modelo";"Cor";"Tipo";"status"\n';

      for (const servico of servicos) {
        csv += `"${servico.id}";"${servico.descricao}";"${servico.bicicleta.modelo}";"${servico.cliente.nome}";"${servico.itensUtilizados.nome}";"${servico.status}"\n`;
      }

      // Envie o arquivo CSV como resposta
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=servicos.csv");
      res.status(200).send(csv);
    } catch (error) {
      console.error("Erro ao gerar o arquivo CSV de Serviços:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao gerar o arquivo CSV de Serviços." });
    }
  }
}
