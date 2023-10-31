import { Router, Request, Response, NextFunction } from "express";
import { UsuarioController } from "../controller/UsuarioController";
import { Usuario } from "../models/Usuario";
import * as yup from "yup";
import { Not } from "typeorm";
import { PaginasController } from "../controller/PaginasController";
import { Paginas } from "../models/Paginas";
let paginasController: PaginasController = new PaginasController();

async function validar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    let id = Number(req.params.id);
  
    let pagina: Paginas | null = await Paginas.findOneBy({ id });
  
    if (!pagina) {
      return res.status(422).json({ error: "Página não encontrada" });
    }
    res.locals.pagina = pagina;
  
    return next();
  }

let rotas :Router = Router();

rotas.get("/paginas", paginasController.list);

rotas.get("/paginas/:id",validar, paginasController.find);

rotas.post("/paginas", paginasController.create);

rotas.put("/paginas/:id",validar, paginasController.update);

rotas.delete("/paginas/:id",validar, paginasController.delete);

export default rotas;