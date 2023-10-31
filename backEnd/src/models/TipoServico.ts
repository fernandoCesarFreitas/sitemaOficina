import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Servicos } from "./Servicos";

@Entity("tipoServico")
export class TipoServico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  descricao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @OneToMany(() => Servicos, servico => servico.tipoServico)
  servicos: Servicos[];
}
