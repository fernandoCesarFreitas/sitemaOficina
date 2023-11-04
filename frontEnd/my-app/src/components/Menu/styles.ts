import Link from "next/link";
import styled from "styled-components";

export const MenuContainer = styled.aside`
  position: fixed;
  /* float:right; */
  height: 100%;
  display: flex;
  justify-content: flex-start;
  padding: 2rem 0;
  top: 0;
  left: 0;
  background: ${(props) =>
    props.theme.secondaryBackground}; //definido no theme.ts
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const NavLinkContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap:12px;

`;
export const NavLink = styled(Link)`

  &:hover , &:focus{
    color: ${(props) => props.theme.primary};
  }

  &.active{
    color: ${(props) => props.theme.primary};// pegamos c o icone esta ativo ou nao
  }
  text-decoration: none;// para tirar a estilizacao padrao do link
  color: ${(props) => props.theme.secondary};
`;
