import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from "typeorm";

@Entity("financeiro")
export class Financeiro extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  data: Date;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ length: 255 })
  metodoDePagamento: string;
}