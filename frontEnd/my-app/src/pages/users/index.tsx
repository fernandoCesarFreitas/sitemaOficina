import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Header/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import { Styles } from "react-modal";
import { UserForm } from "./components/userForm";
import { User } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

// Estilos personalizados para os modais
const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal Users
export default function Users() {
  const [userList, setUserList] = useState<User[]>([]); // Estado para armazenar a lista de usuários
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [user, setUser] = useState<User>(); // Estado para armazenar os dados de um usuário específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(user: User) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir o usuário ${user.nome}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<User>(`http://localhost:3000/usuarios/${user.id}`)
        .then(() => {
          toast.success("Usuário deletado com sucesso"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setUserList(userList.filter((u) => u.id !== user.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar usuário"); // Exibe mensagem de erro
          console.error("Erro ao excluir usuário: ", error);
        });
    }
  }

  // Função para abrir o modal de criação de usuário
  function openCreateUserModal() {
    setIsModalCreateUserOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreateUserModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
    setIsModalCreateUserOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditUserModal(editUser: User) {
    setUser(editUser);
    setIsModalEditUserOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditUserModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
    setIsModalEditUserOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createUserModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateUserOpen}
        onRequestClose={closeCreateUserModal}
        contentLabel="Modal de Criação de Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Usuário</h1>
        <UserForm closeModal={closeCreateUserModal} />
      </ModalContainer>
    );
  }, [isModalCreateUserOpen]);

  // Cria o modal de edição de usuário
  const editUserModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditUserOpen}
        onRequestClose={closeEditUserModal}
        contentLabel="Modal de Edição de Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Editar Usuário</h1>
        <UserForm closeModal={closeEditUserModal} userData={user} />
      </ModalContainer>
    );
  }, [isModalEditUserOpen, user]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Usuários" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar usuário" onClick={openCreateUserModal} />
          {userList.map((user) => {
            return (
              <Card
                key={user.id}
                openModal={() => openEditUserModal(user)}
                onDelete={() => handleDelete(user)}
              >
                <CardInfo title="ID" data={user.id} />
                <CardInfo title="Nome" data={user.nome} />
                <CardInfo title="E-mail" data={user.email} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createUserModal}
      {editUserModal}
    </AuthGuard>
  );
}

