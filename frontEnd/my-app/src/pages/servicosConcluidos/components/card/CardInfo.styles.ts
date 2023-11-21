import styled, { css } from "styled-components";

export const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.div`
  font-weight: 500;
  font-size: 10px;
  color: ${(props) => props.theme.fontColor};
  line-height: 22px;
  text-transform: uppercase;
`;

export const Data = styled.div`
  color: ${(props) => props.theme.fontColor};
`;