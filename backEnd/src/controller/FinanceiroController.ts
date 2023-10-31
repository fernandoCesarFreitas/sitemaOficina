// import { Paginas } from "../models/Paginas";
// import { Request, Response } from "express";
// import { ILike } from "typeorm";
// import bcrypt from "bcrypt";
// export class PaginasController {
//   async list(req: Request, res: Response): Promise<Response> {
//     let nome = req.query.nome;

//     let paginas: Paginas[] = await Paginas.findBy({
//       nome: nome ? ILike(`%${nome}%`) : undefined,
//     }); //aqui na lista nao usamos as {}
//     return res.status(200).json(paginas);
//   }

//   async create(req: Request, res: Response): Promise<Response> {
//     let body = req.body; //pega o que vem da tela
//     let paginas: Paginas = await Paginas.create({
//       nome: body.nome,
//     }).save(); 

//     return res.status(200).json(paginas); //retorna o usuario criado e o status que deu certo
//   }

//   async update(req: Request, res: Response): Promise<Response> {
//     let body = req.body;

//     let paginas: Paginas = res.locals.paginas;
//     paginas.nome = body.nome;

//     await paginas.save();

//     return res.status(200).json(paginas);
//   }

//   async delete(req: Request, res: Response): Promise<Response> {
//     let body = req.body;
//     console.log(body.id);
//     console.log(res.locals.pagina);
//     let pagina: Paginas = res.locals.pagina;
//     console.log(pagina);
//     pagina.remove();
//     return res.status(200).json();
//   }

//   async find(req: Request, res: Response): Promise<Response> {
//     let paginas: Paginas = res.locals.paginas;
//     return res.status(200).json(paginas);
//   }
// }