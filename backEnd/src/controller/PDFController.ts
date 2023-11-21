import { Request, Response } from "express";
import { Clientes } from "../models/Clientes";
import { Between, ILike } from "typeorm";
import puppeteer from "puppeteer";
import { Servicos } from "../models/Servicos";
import { Financeiro } from "../models/Financeiro";

export class PDFController {
  async downloadPdf(req: Request, res: Response) {
    let body = req.body;
    let html: string = '';

    let dataEntrada = body.dataEntrada;
    let dataSaida = body.dataSaida;
    let tipo: any = body.tipo;
    let id = body.id;

    if (tipo = typeof Servicos) {
      let servico = Servicos.findOneBy({ id: id });
      if (!servico) {
        return res.status(404).json({ mensagem: "Servico não encontrado" });
      }
      tipo = servico;


      html = `<style>
        *{
          font-family: "Arial";
        }
        table{
          width:100%;
          text-align: left;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        table td{
          padding: 10px
        }
        table th{
          padding: 10px
        }
        </style>
        <h1>Lista de usuários</h1>
      <table border="1">`;

      let servicos: Servicos[] = await Servicos.find({
        
        where: {
          dataEntrada: Between(dataEntrada, dataSaida),
          dataSaida: Between(dataEntrada, dataSaida)
        }
      });
      html += `<tr>
      <th>Id</th>
      <th>Cliete</th>
      <th>Valor</th>
      <th>Bicicleta</th>
      <th>Tipo de serviço</th>
      <th>Itens utilizados</th>
      <th>Data de entrada</th>
      <th>Data de saida</th>
      <th>Status<th></tr>`;
      servicos.forEach((element) => {
        html += `<tr>
        <td>${element.id}</td>
        <td>${element.cliente}</td>
        <td>${element.valor}</td>
        <td>${element.bicicleta}</td>
        <td>${element.itensUtilizados}</td>
        <td>${element.dataEntrada}</td>
        <td>${element.dataSaida}</td>
        <td>${element.status}</td></tr>\r`;
      });
      html += "</table>";
      let today = new Date(Date.now());
      let data = today.toLocaleString(); // "30/1/2022"
      html += `<div>Gerado por: Juca às ${data}</div>`;

    }

    if (tipo == Financeiro) {
      let financeiro = Financeiro.findBy({ id: id });
      if (!financeiro) {
        return res.status(404).json({ mensagem: "Financeiro não encontrado" });
      }
      tipo = financeiro

      html = `<style>
        *{
          font-family: "Arial";
        }
        table{
          width:100%;
          text-align: left;
          border-collapse: collapse;
          margin-bottom: 10px;
        }
        table td{
          padding: 10px
        }
        table th{
          padding: 10px
        }
        </style>
        <h1>Lista de usuários</h1>
      <table border="1">`;

      let financeiros: Financeiro[] = await Financeiro.find({
        where: {
          data: Between(dataEntrada, dataSaida),
        }
      });
      html += `<tr><th>Id</th>
      <th>status</th>
      <th>metodoDePagamento</th>
      <th>Email</th>
      <th>ServicosRealizados</th></tr>`;
      financeiros.forEach((element) => {
        html += `<tr><td>${element.id}</td>
        <td>${element.status}</td>
        <td>${element.servicosRealizados}</td></tr>\r`;
      });
      html += "</table>";
      let today = new Date(Date.now());
      let data = today.toLocaleString(); // "30/1/2022"
      html += `<div>Gerado por: Juca às ${data}</div>`;
    }

    if (!dataEntrada) {
      dataEntrada == "01.01.2020"
    }
    if (!dataSaida) {
      dataSaida == "01.01.2100"
    }


    let pdfBuffer = await PDFController.pdf(html);

    res.append("Content-Type", "application/x-pdf");
    res.append("Content-Disposition", 'attachment; filename="output.pdf"');
    res.send(pdfBuffer);
    return res.status(200).json({ mensagem: "Pdf enviado" });
  
  }

  static async pdf(html: string) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setContent(html);

    const pdfBuffer = await page.pdf();
    await page.close();
    await browser.close();

    return pdfBuffer;
  }
}