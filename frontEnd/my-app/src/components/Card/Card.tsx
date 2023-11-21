import { MouseEventHandler, ReactNode } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash , FileCsv} from "phosphor-react";

interface CardProps {
  children: ReactNode;
  openModalEdit: MouseEventHandler<HTMLButtonElement>;
  opemModalDelete: MouseEventHandler<HTMLButtonElement>;
  
}

export function Card({ children, openModalEdit, opemModalDelete }: CardProps) {
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
            onClick={opemModalDelete}
          >
            {<Trash size={24} />}
          </IconButton>
         
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}
