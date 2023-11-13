import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Servicos } from "./Servicos";
import { MetodoDePagamento } from "./MetodoDePagamento";

@Entity("financeiro")
export class Financeiro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ type: "timestamp", default: "now()" })
  data: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @OneToMany(() => Servicos, servico => servico.financeiro)
  servicosRealizados: Servicos;

  @OneToMany(() => MetodoDePagamento, metodoDePagamento => metodoDePagamento.financeiro)
  metodoDePagamento: MetodoDePagamento;
}