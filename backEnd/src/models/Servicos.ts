import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import { Bicicleta } from "./Bicicletas";
import { Clientes } from "./Clientes";
import { Financeiro } from "./Financeiro";
import { Itens } from "./Itens";

@Entity("servicos")
export class Servicos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamp", default: "now()", nullable: true })
  dataEntrada: string

  @Column({ nullable: true })
  dataSaida: string

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 255 })
  status: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ nullable: true })
  observacoes: string;

  bicicleta_id: number;

  @ManyToOne(() => Bicicleta, bicicleta => bicicleta.servicosRealizados,{ eager: true })
  @JoinColumn({ name: "bicicleta_id" })
  bicicleta: Bicicleta;


  cliente_id: number;

  @ManyToOne(() => Clientes, cliente => cliente.servicosRealizados ,{ eager: true })
  @JoinColumn({ name: "cliente_id" })
  cliente: Clientes;

  financeiro_id: number;

  @ManyToOne(() => Financeiro, financeiro => financeiro.servicosRealizados,{ eager: true })
  @JoinColumn({ name: "financeiro_id" })
  financeiro: Financeiro;

  item_servico: number;

  @ManyToOne(() => Itens, item => item.servico,{ eager: true })
  @JoinColumn({ name: "item_servico" })
  itensUtilizados: Itens;
}