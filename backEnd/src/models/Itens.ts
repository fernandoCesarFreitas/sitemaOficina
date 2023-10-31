import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Servicos } from "./Servicos";

@Entity("itens")
export class Itens extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({})
  quantidade: number;

  @Column({ length: 255 })
  maoDeObra: string;

  @Column({ length: 255 })
  observacoes: string;

  @ManyToOne(() => Servicos, servico => servico.itensUtilizados)
  servico: Servicos;
}
