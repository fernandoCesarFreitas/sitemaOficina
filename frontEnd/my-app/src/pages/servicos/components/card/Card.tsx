import { MouseEventHandler, ReactNode } from "react";
import {
  ButtonsContainer,
  ContentContainer,
  DivContainer,
  IconButton,
} from "./Card.styles";
import { Pencil, Trash, Check } from "phosphor-react";
import { Order } from "../..";

// Interface que define as propriedades esperadas pelo componente Card
interface CardProps {
  children: ReactNode; // Conteúdo interno do componente
  openModalEdit: MouseEventHandler<HTMLButtonElement>; // Função para abrir o modal de edição
  openModalDelete: MouseEventHandler<HTMLButtonElement>; // Função para abrir o modal de exclusão
  opemModalConcluido: MouseEventHandler<HTMLButtonElement>; // Função para abrir o modal de conclusão
  orderData?: Order; // Dados da ordem (opcional)
}

// Componente funcional Card que recebe as propriedades definidas pela interface CardProps
export function Card({
  children,
  openModalEdit,
  openModalDelete,
  opemModalConcluido,
  orderData,
}: CardProps) {
  return (
    <DivContainer>
      <ContentContainer>
        {children} {/* Renderiza o conteúdo interno passado como propriedade */}
        <ButtonsContainer>
          {/* Botão de edição */}
          <IconButton title="Editar" variant="primary" onClick={openModalEdit}>
            {<Pencil size={24} />}
          </IconButton>
          {/* Botão de exclusão */}
          <IconButton
            title="Excluir"
            variant="danger"
            onClick={openModalDelete}
          >
            {<Trash size={24} />}
          </IconButton>
          {/* Botão de conclusão */}
          <IconButton
            title="Concluir"
            variant="primary"
            onClick={opemModalConcluido}
          >
            <Check size={24} weight="bold" />
          </IconButton>
        </ButtonsContainer>
      </ContentContainer>
    </DivContainer>
  );
}
