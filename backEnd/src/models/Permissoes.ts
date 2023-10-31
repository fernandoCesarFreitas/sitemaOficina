// import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
// import { Usuario } from "./Usuario";
// import { Paginas } from "./Paginas";

// @Entity('permissao')
// export class Permissoes extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column({ length: 255 })
//   tipo: string;

 
//   id_usuario: number;

 
//   id_pagina: number;

//   @ManyToOne(()=> Usuario,(usuario)=>usuario.permissoes,{eager:true})
//   @JoinColumn({name:'id_usuario'})
//   public usuario: Usuario;

//   @ManyToOne(()=> Paginas,(pagina)=>pagina.permissoes,{eager:true})
//   @JoinColumn({name:'id_pagina'})
//   public pagina: Paginas;

// }