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

  @Column({ type: "timestamp", default: "now()" })
  data: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ length: 255 })
  metodoDePagamento: string;
}