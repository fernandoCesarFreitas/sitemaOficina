import { Request, Response } from "express";
import { Clientes } from "../models/Clientes";
import { ILike } from "typeorm";
import { Servicos } from "../models/Servicos";

export class RelatoriosController {
    servicosRealizados: any;
    async exportarCsv(req: Request, res: Response): Promise<Response> {
        let nome = req.query.nome;

        let clientes: Clientes[] = await Clientes.findBy({
            nome: nome ? ILike(`${nome}`) : undefined,
        });

        let header = '"ID";"Nome";"Email";"Serviços"\n';
        let csv = header;

        clientes.forEach(async (element) => {
            let servicosRealizados = await this.buscarServicos(element.id)
            
            csv += `"${element.id}";"${element.nome}";"${element.email}";"${servicosRealizados}"\r`;
        });


        res.append("Content-Type", "text/csv");
        res.attachment("usuarios.csv");
        return res.status(200).send(csv);

    }

    async buscarServicos(id: number) {
        let servicos: Servicos[] = await Servicos.find({
            where: {
                cliente_id: id
            }
        });

        servicos.forEach(async (element) => {
            this.servicosRealizados.push(element.descricao)
        })
        return this.servicosRealizados;
    }
}