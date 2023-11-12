import { MouseEventHandler, ReactNode } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";

interface CardProps {
  children: ReactNode;
  openModal: MouseEventHandler<HTMLButtonElement>;
  onDelete: MouseEventHandler<HTMLButtonElement>;
}

export function Card({ children, openModal, onDelete }: CardProps) {
  return (
    <DivContainer>
      <ContentContainer>
        {children}
        <ButtonsContainer>
          <IconButton title="Editar" variant="primary" onClick={openModal}>
            {<Pencil size={24} />}
          </IconButton>
          <IconButton title="Excluir" variant="danger" onClick={onDelete}>
            {<Trash size={24} />}
          </IconButton>
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}