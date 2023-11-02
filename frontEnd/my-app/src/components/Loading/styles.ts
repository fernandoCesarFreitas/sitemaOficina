import styled, { keyframes } from "styled-components";

// Define a animação de rotação
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Estilize o componente de loading
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;

  background-color: ${(props) => props.theme.background};
`;

export const Spinner = styled.div`
  border: 4px solid ${(props) => props.theme["gray-100"]};
  border-top: 4px solid ${(props) => props.theme.primary}; /* Cor do spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite; /* Aplicar a animação */
`;