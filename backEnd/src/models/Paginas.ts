import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne } from "typeorm";
import { Permissoes } from "./Permissoes";

@Entity('paginas')
export class Paginas extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  nome: string;

  @OneToMany(()=> Permissoes,(permissao)=>permissao.pagina)
  public permissoes: Permissoes[];

}