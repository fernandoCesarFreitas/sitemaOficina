import { Request, Response } from "express";
import { Usuario } from "../models/Usuario";
import bcrypt from "bcrypt";

export class AutenticacaoController {
  
  async login(req: Request, res: Response): Promise<Response> {
    let email: string = req.body.email;
    let senha: string = req.body.senha;
    console.log(email, senha);

    let usuario: Usuario | null = await Usuario.findOne({
      where: { email: email }, //compara todos os email com o email digitado
      select: ["id", "email", "senha", "nome"], //busca mesmo que mande nao mostrar a nivel de db
    });
    if (!usuario) {
      // se nao encontrar nenhum
      return res.status(401).json({ mensagem: "Dados não encontrados!" });
    }
    let resultado = await bcrypt.compare(senha, usuario.senha); //substitui a função que estava usando

    if (!resultado) {
      return res.status(401).json({ mensagem: "Senha inválida!" }); // essas mensagens são usados no navegador
    }
    let token: string = Buffer.from(`${email}:${senha}`).toString("base64");

    // Remover a senha do usuário antes de enviá-la na resposta
    const { senha: senhaUsuario, ...userWithoutPassword } = usuario;
    console.log(userWithoutPassword);

    return res.status(200).json({ token, type: "Basic", usuario: userWithoutPassword });
  }
}