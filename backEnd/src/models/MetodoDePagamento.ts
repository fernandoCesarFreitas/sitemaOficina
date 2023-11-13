import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Financeiro } from "./Financeiro";

@Entity("metodoDePagamento")
export class MetodoDePagamento extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    situacao: string;

    @ManyToOne(()=> Financeiro,financeiro=> financeiro.metodoDePagamento,{eager: true})
    @JoinColumn({name: "financeiro_id"})
    financeiro: Financeiro;
}