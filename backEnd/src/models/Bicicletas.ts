import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  OneToOne,
} from "typeorm";

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
}
