import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";

import { Servicos } from "./Servicos";

@Entity("bicicleta")
export class Bicicleta extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  modelo: string;

  @Column({ length: 255 })
  tipo: string;

  @Column({ length: 255 })
  cor: string;

  @OneToMany(() => Servicos, servico => servico.bicicleta)
  servicosRealizados: Servicos[];
}
