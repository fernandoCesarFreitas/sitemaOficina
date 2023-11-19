import styled from "styled-components";

type InputProps = {
  width: number;
};

export const StyledSelect = styled.select<InputProps>`
  margin: 0;
  padding: 0;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme["gray-100"]};
  outline: none;
  background: transparent;
  color: ${(props) => props.theme.fontColor};
  width: ${(props) => props.width}px;

  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.primary};
  }
  option {
    background-color: ${(props) => props.theme.primary}; 
  }
`;