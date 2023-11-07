import { AuthProvider } from "@/contexts/AuthContext";
import { GlobalStyle } from "@/styles/global";
import { darkTheme } from "@/styles/themes/dark";
import { defaultTheme } from "@/styles/themes/default";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Sun, Moon } from "phosphor-react";

// Componente principal que renderiza o aplicativo
export default function App({ Component, pageProps }: AppProps) {
  // Estado para controlar o tema (inicializado como tema escuro)
  const [isDarkTheme, setDarkTheme] = useState(true);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setDarkTheme((prevTheme) => !prevTheme);
  };

  // Estilos para o botão de alternância de tema
  const buttonStyle = {
    position: "fixed", // Define a posição fixa no layout
    bottom: "20px", // Define a distância do fundo (20 pixels)
    right: "20px", // Define a distância da direita (20 pixels)
    padding: "10px", // Define o preenchimento interno
    borderRadius: "50%", // Define a borda do botão como circular
    cursor: "pointer", // Define o cursor como indicador de interação
    zIndex: 999, // Ajusta o índice z para garantir que o botão esteja acima do conteúdo
  };

  // Estilos para o container do aplicativo, escondendo a rolagem horizontal
  const appStyle = {
    overflowX: "hidden", // Esconde a rolagem horizontal se estiver presente
  };

  return (
    <div style={appStyle as React.CSSProperties}>
      {/* Provedor de autenticação */}
      <AuthProvider>
        {/* Provedor de tema */}
        <ThemeProvider theme={isDarkTheme ? darkTheme : defaultTheme}>
          {/* Estilos Globais */}
          <GlobalStyle />
          {/* Botão de alternância de tema */}
          <button
            onClick={toggleTheme}
            style={buttonStyle as React.CSSProperties}
          >
            {/* Ícone do Sol se for tema claro, Ícone da Lua se for tema escuro */}
            {isDarkTheme ? <Sun size={15} alt="Tema Claro"/> : <Moon size={15} alt="Tema Escuro"/>}
          </button>
          {/* Componente principal do aplicativo */}
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}




