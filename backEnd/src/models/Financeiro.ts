import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Servicos } from "./Servicos";

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

  @Column({ length: 255 })
  metodoDePagamento: string;

  @OneToMany(() => Servicos, servico => servico.financeiro, { eager: true })
  servicosRealizados: Servicos;
}