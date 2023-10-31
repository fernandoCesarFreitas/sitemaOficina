import { Produtos } from "../models/Produtos";
import { Request, Response } from "express";

export class ProdutosController{

    async list (req: Request, res: Response):Promise<Response>{
       let produtos: Produtos[] = await Produtos.find()
        return res.status(200).json({produtos})
    }

    async create(req: Request, res: Response):Promise<Response>{
        let body = req.body;

        let produto: Produtos =  await Produtos.create({
            nome:body.nome,
            descricao:body.descricao,
            preco:body.preco,
            tipo:body.tipo,
        }).save();
        return res.status(200).json(produto);
    }

    async update(req: Request, res: Response):Promise<Response>{
        let body =  req.body;

        let id  = Number(req.params.id);

        let produto: Produtos| null = await Produtos.findOneBy({id});

        if(!produto){
            return res.status(422).json({error:'Produto não encontrado'});
        }

        produto.nome = body.nome;
        produto.descricao = body.descricao;
        produto.preco = body.preco;
        produto.tipo = body.tipo;
        await produto.save();
        return res.status(200).json(produto)
    }

    async delete (req: Request, res: Response): Promise<Response>{
        let body = req.body;
        let id = Number(req.params.id);

        let produto: Produtos | null =  await Produtos.findOneBy({id});

        if(!produto){
            return res.status(422).json({error:'produto não encontrado'});
        }
        produto.remove();
        return res.status(200).json();
    }

    async find(req: Request, res: Response):Promise<Response>{
        let body = req.body;
        let id = Number(req.params.id);

        let produto: Produtos| null = await Produtos.findOneBy({id});

        if(!produto){
            return res.status(422).json({error:'produto não encontrado'});
        }

        return res.status(200).json(produto)
    }

}