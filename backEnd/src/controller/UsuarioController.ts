import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";
import { ILike } from "typeorm";
import bcrypt from "bcrypt";
export class UsuarioController {
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let usuario: Usuario[] = await Usuario.find({
      where: { status: "Ativo" },
    });
    return res.status(200).json(usuario);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela
    let senha = await bcrypt.hash(body.senha, 10);
    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: senha,
      status: 'Ativo',
    }).save(); //cria o usuario

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha); //retorna o usuario criado e o status que deu certo
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let senha = await bcrypt.hash(body.senha, 10);
    let usuario: Usuario = res.locals.usuario;
    usuario.nome = body.nome;
    usuario.email = body.email;
    usuario.senha = senha;

    await usuario.save();
    let { senha: s, ...usuarioSemSenha } = usuario;// o s guarda a senha que retirou do usuarioSemSenha

    return res.status(200).json(usuarioSemSenha);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    console.log('chegou aqui')
    let body = req.body;
    let usuario: Usuario = res.locals.usuario;
    usuario.status = 'Inativo';
    await usuario.save();
    return res.status(200).json(usuario);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let usuario: Usuario = res.locals.usuario;
    return res.status(200).json(usuario);
  }

  async gerarCSVUsuarios(req: Request, res: Response): Promise<void> {
    try {
      const usuarios: Usuario[] = await Usuario.find(); // Substitua pelo método de busca apropriado

      if (usuarios.length === 0) {
        res.status(404).json({ mensagem: "Nenhum Usuário encontrado." });
      }

      let csv = '"ID";"Nome";"Email";"status"\n';

      for (const usuario of usuarios) {
        csv += `"${usuario.id}";"${usuario.nome}";"${usuario.email}";"${usuario.status}"\n`;
      }

      // Envie o arquivo CSV como resposta
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=usuarios.csv");
      res.status(200).send(csv);
    } catch (error) {
      console.error("Erro ao gerar o arquivo CSV de Usuarios:", error);
      res
        .status(500)
        .json({ mensagem: "Erro ao gerar o arquivo CSV de Usuarios." });
    }
  }
}

