import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalStyle } from "@/styles/global";
import { darkTheme } from "@/styles/themes/dark";
import { defaultTheme } from "@/styles/themes/default";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkTheme, setDarkTheme] = useState(true); // setado que semore vai iniciar com o tema escuro
  return (
    <AuthProvider>
      <ThemeProvider theme={ isDarkTheme ? defaultTheme : darkTheme }>{/*setamos o valor  para carregar o thema dark  senao carregar defaul*/}
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  );
}
//importando os estilos globais   <GlobalStyle />
