import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
  } from "typeorm";

@Entity("servicos")
export class Servicos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({  type: "timestamp" })
  dataEntrada:string

  @Column({  type: "timestamp", default: "now()" ,nullable: true })
  dataSaida:string

  @Column({ length: 255 })
  descricao: string;

  @Column({ length: 255 })
  status: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;
}