import  Modal  from 'react-modal';
import styled from "styled-components";

export const UserContainer = styled.body`
  width: 104vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  display: flex;
  justify-content: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 2rem;

  gap: 12px;
`;

export const ModalContainer = styled(Modal)`
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.white};
  width:400px;
  padding:3rem ;
  border-radius: 8px;
  h1{
    font-size: 1.5rem;
    margin:0 20px 0 0 ;

  }
`