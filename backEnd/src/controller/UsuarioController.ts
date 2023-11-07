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

  async csv(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let users: Usuario[] = await Usuario.findBy({}); //aqui na lista nao usamos as {}
    console.log(users)
    let header = '"Nome";"Email"\n';
    let csv = header;

    for (let idx in users) {
      let pessoa = users[idx];
      csv +=
        '"' + pessoa.nome + '";"' + pessoa.email + '"\n';
    }
    console.log(csv)
    return res.status(200).send(csv).attachment('output.csv');
  }
}
