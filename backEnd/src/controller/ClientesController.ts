import *  as nodemailer from 'nodemailer';
import { Request, Response } from "express";
import { Clientes } from "../models/Clientes";
import { EmailController } from "./EmailController"

let email1: EmailController = new EmailController();

export class ClientesController {

    async create(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let nome = body.nome;
        let email = body.email;
        let telefone = body.telefone;
        let cpf = body.cpf;
        let endereco = body.endereco;
        let cidade = body.cidade;
        let status = "Ativo";

        let cliente: Clientes = await Clientes.create({
            nome,
            email,
            telefone,
            cpf,
            endereco,
            cidade,
            status,
        }).save()
        
        let titulo = 'Você acaba de se cadastra no site da Oficina de bicicletas do seu João!'
        let mensagem = 'A Oficina de bicicletas do seu João agradece pela sua preferência! Qualquer dúvida entre em contato por este email ou procure a nossa loja desde ja agrafecemos'
        email1.emailAutomaticco(cliente, titulo, mensagem)
        return res.status(200).json(cliente);
    }

    async list(req: Request, res: Response): Promise<Response> {
        let clientes: Clientes[] = await Clientes.find();

        return res.status(200).json(clientes);
    }

    async update(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let cliente: Clientes = res.locals.clientes;

        if (!cliente) {
            return res.status(400).json({ mensagem: "Cliente não encontrado" })
        }

        let nome = body.nome;
        let email = body.email;
        let telefone = body.telefone;
        let cpf = body.cpf;
        let endereco = body.endereco;
        let cidade = body.cidade;
        let status = "Ativo";

        cliente.nome = nome;
        cliente.email = email;
        cliente.cpf = cpf;
        cliente.telefone = telefone;
        cliente.endereco = endereco;
        cliente.cidade = cidade;
        cliente.status = status;
        await cliente.save();

        let titulo = 'Você acaba de atualizar seu cadastro na Oficina do seu João!'
        let mensagem = 'A Oficina de bicicletas do seu João agradece pela sua preferência! Qualquer dúvida entre em contato por este email ou procure a nossa loja'

        email.emailAutomaticco(cliente, titulo, mensagem);

        return res.status(200).json(cliente);
    }

    async delete(req: Request, res: Response): Promise<Response> {
        let body = req.body;

        let cliente: Clientes = res.locals.clientes;

        if (!cliente) {
            return res.status(400).json({ mensagem: "Cliente não encontrado" })
        }

        cliente.status = "Inativo";
        await cliente.save();

        return res.status(200);
    }

    async find(req: Request, res: Response): Promise<Response> {
        let clientes: Clientes = res.locals.clientes;
        return res.status(200).json(clientes);
    }

}