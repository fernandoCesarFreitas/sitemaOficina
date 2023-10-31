import { Permissoes } from "../models/Permissoes";
import { Request, Response } from "express";
import { ILike } from "typeorm";
import bcrypt from "bcrypt";
export class PermissoesController {

  async list(req: Request, res: Response): Promise<Response> {
    
    let id_usuario:number = Number(req.query.id_usuario);
    console.log(id_usuario);
    let permissoes: Permissoes[] = await Permissoes.findBy({
    usuario: id_usuario ? {id:id_usuario} : undefined,//para filtrar por usuario
    }); //aqui na lista nao usamos as {}
    return res.status(200).json(permissoes);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body; //pega o que vem da tela
    let permissoes: Permissoes = await Permissoes.create({
        tipo: body.tipo,
        id_usuario: body. id_usuario,
        id_pagina: body.id_pagina,
    }).save(); 

    return res.status(200).json(permissoes); //retorna o usuario criado e o status que deu certo
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let permissoes: Permissoes = res.locals.permissoes;
    permissoes.tipo = body.nome;
    permissoes.id_usuario = body.id_usuario;
    permissoes.id_pagina = body.id_pagina;
    await permissoes.save();

    return res.status(200).json(permissoes);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let permissoes: Permissoes = res.locals.permissoes;
    permissoes.remove();
    return res.status(200).json();
  }

  async find(req: Request, res: Response): Promise<Response> {
    let permissoes: Permissoes = res.locals.permissoes;
    return res.status(200).json(permissoes);
  }
}