import { Input } from "@/components/input";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    body{
        background-color: ${(props) => props.theme.background};//props é o tema que está sendo passado background é o nome da propriedade
        color: ${(props) => props.theme.fontColor};//props é o tema que está sendo passado fontColor é o nome da propriedade usamos 
    }

    body,input, textarea, button{
        
        font-family: 'Roboto', sans-serif;
        font-weight: 400;
        font-size: 1rem;//rem ajuda na acessibilidade sendo possivel aumentar a fonte
    }

    textarea.focus, input.focus {
        box-shadow: 0 0 0 0;
        outline: 0;
    }
`;
