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

    async gerarCSVItens(req: Request, res: Response): Promise<void> {
        try {
          const itens: Itens[] = await Itens.find(); // Substitua pelo método de busca apropriado
    
          if (itens.length === 0) {
            res.status(404).json({ mensagem: "Nenhum Item encontrado." });
          }
    
          let csv =
            '"ID";"Nome";"Marca";"Valor";"Quantidade";"Status"\n';
    
          for (const item of itens) {
            csv += `"${item.id}";"${item.nome}";"${item.marca}";"${item.valor}";"${item.quantidade}";"${item.status}"\n`;
          }
    
          // Envie o arquivo CSV como resposta
          res.setHeader("Content-Type", "text/csv");
          res.setHeader(
            "Content-Disposition",
            "attachment; filename=itens.csv"
          );
          res.status(200).send(csv);
        } catch (error) {
          console.error("Erro ao gerar o arquivo CSV de itens:", error);
          res
            .status(500)
            .json({ mensagem: "Erro ao gerar o arquivo CSV de itens." });
        }
      }
}