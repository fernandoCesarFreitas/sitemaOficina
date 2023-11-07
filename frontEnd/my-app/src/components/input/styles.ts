import styled from "styled-components";

type InputProps = {
  whidth: number;
};
//
export const InputContainer = styled.div<InputProps>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: ${(props) => props.whidth}px;

  input {
    margin: 0;
    padding: 0;
    border: none; //remove a borda
    border-bottom: 1px solid  ${(props) => props.theme["gray-100"]}; //adiciona uma borda embaixo
    outline: none; //remove a borda quando clicado
    background: transparent;
    color: ${(props) => props.theme.fontColor};
    &:focus {
      //funciona no css normal
      border-bottom: 2px solid  ${(props) => props.theme.primary}; //aumenta a borda embaixo quando clicado
    }
  }

  span {
    color:  ${(props) => props.theme.danger};
  }
`;
