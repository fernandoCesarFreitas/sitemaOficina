import styled from "styled-components";

interface ButtonContainerProps {
  width: number;
  heigth: number;
  variant: string;
}

export const ButtonContainer = styled.button<ButtonContainerProps>`

  width: ${(props) =>
    props.width}px; //javascript definimos o tamanho do botão para poder usar ele em varios locais

  height: ${(props) => props.heigth}px;
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme[props.variant]};
  border-radius: 10px;
  border: none;
`;
