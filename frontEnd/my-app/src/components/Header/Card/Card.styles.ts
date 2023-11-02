import styled, { css } from "styled-components";

interface IconButtonProps {
  variant: "primary" | "danger" | "secondary";
}

export const DivContainer = styled.div`
  width: 75rem;
  height: 4rem;
  background: ${(props) => props.theme.secondaryBackground};
  border: 1px solid ${(props) => props.theme["gray-100"]};
  border-radius: 8px;

  padding: 20px;

  strong {
    flex: 1;
    font-weight: 700;
    font-size: 1.25rem;
    margin-left: 3rem;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 3.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.button<IconButtonProps>`
  width: 2rem;
  height: 2rem;
  font-weight: 500;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${(props) => props.theme[props.variant]};
  color: ${(props) => props.theme.white};
`;
