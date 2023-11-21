import { MouseEventHandler, ReactNode, useState } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash, Circle, CheckCircle } from "phosphor-react";
import axios from "axios";
import { toast } from "react-toastify";
import { Order } from "../..";

// ... restante do código

interface CardProps {
  children: ReactNode;
  openModalEdit: MouseEventHandler<HTMLButtonElement>;
  openModalDelete: MouseEventHandler<HTMLButtonElement>;
  opemModalConcluido: MouseEventHandler<HTMLButtonElement>;
  orderData?: Order;
}
export function Card({
  children,
  openModalEdit,
  openModalDelete,
  opemModalConcluido,
  orderData,
}: CardProps) {
  console.log(orderData);
  return (
    <DivContainer>
      <ContentContainer>
        {children}
        <ButtonsContainer>
          <IconButton title="Editar" variant="primary" onClick={openModalEdit}>
            {<Pencil size={24} />}
          </IconButton>
          <IconButton
            title="Excluir"
            variant="danger"
            onClick={openModalDelete}
          >
            {<Trash size={24} />}
          </IconButton>
          <IconButton
            title="Concluir"
            variant="primary"
            onClick={opemModalConcluido}
          >
            {orderData && orderData.status === "Concluído" ? (
              <CheckCircle size={36} color="yellow" />
            ) : (
              <Circle size={24} />
            )}
          </IconButton>
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}

// ... restante do código
