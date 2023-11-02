// Importando as dependências necessárias
import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// Definindo o tipo de dados para um usuário
export type User = {
  id: number;
  nome: string;
  email: string;
};

// Definindo o tipo de dados para as credenciais de login
type SignInCredentials = {
  email: string;
  password: string;
};

// Definindo o tipo de dados para o contexto de autenticação
type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user?: User;
  logout: () => void;
  getLogged: () => void;
  loading: boolean;
};

// Definindo o tipo de dados para as propriedades do provedor de autenticação
type AuthProviderProps = {
  children: ReactNode;
};

// Criando o contexto de autenticação
export const AuthContext = createContext({} as AuthContextData);

// Definindo o provedor de autenticação
export function AuthProvider({ children }: AuthProviderProps) {
  // Definindo o estado para o usuário e o estado de carregamento
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  // Verificando se o usuário está autenticado
  const isAuthenticated = !!user;

  // Obtendo o roteador
  const router = useRouter();

  // Buscando o usuário logado quando o componente é carregado
  useEffect(() => {
    async function getUser() {
      await getLogged();
    }

    getUser();
  }, []);

  // Definindo a função para deslogar o usuário
  const logout = () => {
    // Removendo o usuário logado do localStorage
    localStorage.removeItem("logged");

    // Definindo o usuário como undefined
    setUser(undefined);

    // Redirecionando para a página de login
    router.push("/login");
  };

  // Definindo a função para definir o usuário logado
  const setLogged = (token: string, user: User) => {
    // Armazenando o token e o usuário no localStorage
    localStorage.setItem("logged", JSON.stringify({ token, user }));

    return true;
  };

  // Definindo a função para obter o usuário logado
  const getLogged = async () => {
    // Definindo o estado de carregamento como true
    setLoading(true);

    // Verificando se estamos no navegador
    if (typeof window !== "undefined") {
      // Obtendo o usuário logado do localStorage
      const logged = localStorage?.getItem("logged");

      if (logged) {
        // Parseando o usuário logado
        const userLogged = JSON.parse(logged);

        // Definindo o cabeçalho de autorização para o axios
        axios.defaults.headers.common[
          "Authorization"
        ] = `Basic ${userLogged.token}`;

        // Definindo o cabeçalho de controle de cache para o axios
        axios.defaults.headers.common["Cache-Control"] = "no-store";

        if (userLogged) {
          // Definindo o usuário após um delay de 3 segundos
          setTimeout(function () {
            setUser({
              id: userLogged.user.id,
              nome: userLogged.user.nome,
              email: userLogged.user.email,
            });

            // Definindo o estado de carregamento como false
            setLoading(false);
          }, 3000);
        }

        return logged && JSON.parse(logged);
      }
    }

    // Definindo o estado de carregamento como false
    setLoading(false);

    return;
  };

  // Definindo a função para realizar o login do usuário
  async function signIn({ email, password }: SignInCredentials) {
    try {
      console.log(email);
      console.log( password);
      // Fazendo a requisição de login
      const response = await axios.post("http://localhost:3000/login", {
        email,
        senha: password,
      });

      // Obtendo o usuário e o token da resposta
      const user = response.data.usuario;
      const { token } = response.data;
      console.log("token"+token);
      // Definindo o usuário logado
      setLogged(token, user);
    } catch (error) {
      // Definindo o usuário como undefined em caso de erro
      setUser(undefined);

      // Lançando o erro
      throw error;
    }
  }

  // Retornando o provedor de autenticação
  return (
    <AuthContext.Provider
      value={{ signIn, isAuthenticated, user, logout, getLogged, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
