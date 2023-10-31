// import { PermissoesController } from './../controller/Permissoes';
// import { Router, Request, Response, NextFunction } from "express";
// import { UsuarioController } from "../controller/UsuarioController";
// import { Usuario } from "../models/Usuario";
// import * as yup from "yup";
// import { Not } from "typeorm";
// import { Permissoes } from "../models/Permissoes";
// let permissoesController: PermissoesController = new PermissoesController();

// async function validar(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ): Promise<Response | void> {
//     let id = Number(req.params.id);
  
//     let permissoes: Permissoes | null = await Permissoes.findOneBy({ id });
  
//     if (!permissoes) {
//       return res.status(422).json({ error: "Permissao não encontrada" });
//     }
//     res.locals.permissoes = permissoes;
  
//     return next();
//   }

// let rotas :Router = Router();

// rotas.get("/permissoes:id", permissoesController.list);

// rotas.get("/permissoes/:id",validar, permissoesController.find);

// rotas.post("/permissoes", permissoesController.create);

// rotas.put("/permissoes/:id",validar, permissoesController.update);

// rotas.delete("/permissoes/:id",validar, permissoesController.delete);

// export default rotas;