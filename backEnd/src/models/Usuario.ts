import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";

@Entity("usuarios")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  status: string

  @Column({ length: 255 })
  nome: string;

  @Column({ select: false }) //nenhuma consulta ira retornar a senha
  senha: string;

  @Column({ unique: true }) // usuario unico
  email: string;
}
