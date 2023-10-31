import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity('produtos')
export class Produtos extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @Column({ length: 255 })
  descricao: string;

  @Column({ })
  preco: number;

  @Column({ })
  tipo: string;
}