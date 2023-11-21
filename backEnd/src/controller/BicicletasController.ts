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
        let nome = req.query.nome;
    
        let bicicletas: Bicicleta[] = await Bicicleta.find({
          where: { status: "Ativo" },
        });
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

        return res.status(200).json(bicicleta);
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

    async gerarCSVBikes(req: Request, res: Response): Promise<void> {
        try {
          const bicicletas: Bicicleta[] = await Bicicleta.find(); // Substitua pelo método de busca apropriado
    
          if (bicicletas.length === 0) {
            res.status(404).json({ mensagem: "Nenhum Bicicleta encontrada." });
          }
    
          let csv = '"ID";"Modelo";"Cor";"Tipo";"status"\n';
    
          for (const bicicleta of bicicletas) {
            csv += `"${bicicleta.id}";"${bicicleta.modelo}";"${bicicleta.cor}";"${bicicleta.tipo}";"${bicicleta.status}"\n`;
          }
    
          // Envie o arquivo CSV como resposta
          res.setHeader("Content-Type", "text/csv");
          res.setHeader("Content-Disposition", "attachment; filename=bicicletas.csv");
          res.status(200).send(csv);
        } catch (error) {
          console.error("Erro ao gerar o arquivo CSV de Bicicletas:", error);
          res
            .status(500)
            .json({ mensagem: "Erro ao gerar o arquivo CSV de Bicicletas." });
        }
      }
}