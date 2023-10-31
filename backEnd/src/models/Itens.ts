import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";

@Entity("itens")
export class Pecas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor: number;

  @Column({ length: 255 })
  quantidade: number;

  @Column({ length: 255 })
  maoDeObra: string;

  @Column({ length: 255 })
  observacoes: string;
}
