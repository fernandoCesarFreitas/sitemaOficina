import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import { Styles } from "react-modal";
import { UserForm } from "./components/userForm";
import { User } from "@/contexts/AuthContext";
import Loading from "@/components/Loading";
import { DeleteModal } from "./components/deleteForm";

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
  const [isModalDeleteUserOpen, setIsModalDeleteUserOpen] = useState(false);
  const [user, setUser] = useState<User>(); // Estado para armazenar os dados de um usuário específico
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento da página

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    await axios
      .get<User[]>("http://localhost:3000/usuarios")
      .then((response) => {
        setUserList(response.data);
      });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateUserModal() {
    setIsModalCreateUserOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  const closeCreateUserModal = useCallback(async () => {
    setIsModalCreateUserOpen(false);
    await fetchUsers();
  }, [fetchUsers]);
  // Atualiza a lista de usuários após o fechamento do modal

  // Função para abrir o modal de edição de usuário
  function openEditUserModal(editUser: User) {
    setUser(editUser);
    setIsModalEditUserOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  const closeEditUserModal = useCallback(async () => {
    setIsModalEditUserOpen(false);
    await fetchUsers();
  }, [fetchUsers]);

  function openDeleteUserModal(editUser: User) {
    setUser(editUser);
    setIsModalDeleteUserOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  const closeDeleteUserModal = useCallback(async () => {
    setIsModalDeleteUserOpen(false);
    await fetchUsers();
  }, [fetchUsers]);

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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
  }, [closeCreateUserModal, isModalCreateUserOpen]);

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
  }, [closeEditUserModal, isModalEditUserOpen, user]);

  const deleteUserModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteUserOpen}
        onRequestClose={closeDeleteUserModal}
        contentLabel="Modal de deletar de Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Usuário</h1>
        <DeleteModal closeModal={closeDeleteUserModal} userData={user}/>
      </ModalContainer>
    );
  }, [closeDeleteUserModal, isModalDeleteUserOpen, user]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Usuários" />
      <UserContainer>
        <Menu />
        {loading ? (
          <Loading />
        ) : (
          <ContentContainer>
            <Button label= "Criar usuário" onClick={openCreateUserModal} />
            {userList.map((user) => {
              return (
                <Card
                  key={user.id}
                  openModalEdit={() => openEditUserModal(user)}
                  opemModalDelete={()=>openDeleteUserModal(user)}
                >
                  <CardInfo title="ID" data={user.id} />
                  <CardInfo title="Nome" data={user.nome} />
                  <CardInfo title="E-mail" data={user.email} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {createUserModal}
      {editUserModal}
      {deleteUserModal}
    </AuthGuard>
  );
}
