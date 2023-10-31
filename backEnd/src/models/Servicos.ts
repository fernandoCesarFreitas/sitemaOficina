import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { Bicicleta } from "./Bicicletas";
import { TipoServico } from "./TipoServico";
import { Clientes } from "./Clientes";
import { Financeiro } from "./Financeiro";
import { Itens } from "./Itens";

@Entity("servicos")
export class Servicos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp" })
  dataEntrada: string

  @Column({ type: "timestamp", default: "now()", nullable: true })
  dataSaida: string

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 255 })
  status: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @ManyToOne(() => Bicicleta, bicicleta => bicicleta.servicosRealizados)
  bicicleta: Bicicleta;

  @ManyToOne(() => TipoServico, tipoServico => tipoServico.servicos)
  tipoServico: TipoServico;

  @ManyToOne(() => Clientes, cliente => cliente.servicosRealizados)
  cliente: Clientes;

  @ManyToOne(() => Financeiro, financeiro => financeiro.servicosRealizados)
  financeiro: Financeiro;

  @OneToMany(() => Itens, item => item.servico)
  itensUtilizados: Itens[];
}