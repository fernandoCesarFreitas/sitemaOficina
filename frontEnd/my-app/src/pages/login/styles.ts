import styled from "styled-components";

export const LoginContainer = styled.main`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr; //define que ira ter duas colunas com o mesmo tamanho
  gap: 2rem;

  img {
    height: 100vh;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 2rem;
    line-height: 32px;
  }

  form {
    flex: 1;
    max-width: 26rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    justify-content: center;
    span {
      color: ${(props) => props.theme.danger};
    }
  }
`;
