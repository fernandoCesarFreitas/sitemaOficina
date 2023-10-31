import exp from "constants";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";

import { Servicos } from "./Servicos";

@Entity("clientes")
export class Clientes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 25 })
  telefone: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 255 })
  endereco: string;

  @Column({ length: 255 })
  cidade: string;

  @OneToMany(() => Servicos, servico => servico.cliente)
  servicosRealizados: Servicos[];
}
