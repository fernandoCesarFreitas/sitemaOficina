import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 52px;

    border-bottom: 1px solid ${(props) => props.theme["gray-100"]}

`

export const ContentContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 1.56rem 7rem;

    h1 {
        font-weight: 600;
        font-size: 2rem;
    }

`

export const UserContainer = styled.div`
    display: flex;
    gap: 12px;
    align-items: center;
    justify-content: center;
`