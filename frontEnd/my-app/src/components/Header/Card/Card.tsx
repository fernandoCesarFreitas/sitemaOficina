import { ReactNode } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash } from "phosphor-react";

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <DivContainer>
      <ContentContainer>
        {children}
        <ButtonsContainer>
          <IconButton title="Editar" variant="primary">
            {<Pencil size={24} />}
          </IconButton>
          <IconButton title="Excluir" variant="danger">
            {<Trash size={24} />}
          </IconButton>
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}