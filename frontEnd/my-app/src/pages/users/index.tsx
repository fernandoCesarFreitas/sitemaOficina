// Importa o componente de Autenticação
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
import FileSaver from "file-saver";

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
  // Estado para armazenar a lista de usuários
  const [userList, setUserList] = useState<User[]>([]);

  // Estados para controlar a abertura dos modais
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [isModalDeleteUserOpen, setIsModalDeleteUserOpen] = useState(false);

  // Estado para armazenar os dados de um usuário específico
  const [user, setUser] = useState<User>();

  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(false);

  // Função assíncrona para buscar a lista de usuários
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    await axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateUserModal() {
    setIsModalCreateUserOpen(true);
  }

  // Função assíncrona para fechar o modal de criação de usuário e atualizar a lista de usuários
  const closeCreateUserModal = useCallback(async () => {
    setIsModalCreateUserOpen(false);
    await fetchUsers();
  }, [fetchUsers]);

  // Função para abrir o modal de edição de usuário
  function openEditUserModal(editUser: User) {
    setUser(editUser);
    setIsModalEditUserOpen(true);
  }

  // Função assíncrona para fechar o modal de edição de usuário e atualizar a lista de usuários
  const closeEditUserModal = useCallback(async () => {
    setIsModalEditUserOpen(false);
    await fetchUsers();
  }, [fetchUsers]);

  // Função para abrir o modal de exclusão de usuário
  function openDeleteUserModal(editUser: User) {
    setUser(editUser);
    setIsModalDeleteUserOpen(true);
  }

  // Função assíncrona para fechar o modal de exclusão de usuário e atualizar a lista de usuários
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

  // Cria o modal de exclusão de usuário
  const deleteUserModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteUserOpen}
        onRequestClose={closeDeleteUserModal}
        contentLabel="Modal de Deletar Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Usuário</h1>
        <DeleteModal closeModal={closeDeleteUserModal} userData={user} />
      </ModalContainer>
    );
  }, [closeDeleteUserModal, isModalDeleteUserOpen, user]);

  //função para gerar csv
  function gerarCSV() {
    axios
      .get("http://localhost:3000/usuarioscsv", { responseType: "blob" })
      .then((response) => {
        // Cria um blob com os dados recebidos
        const blob = new Blob([response.data], { type: "text/csv" });
  
        // Utiliza o FileSaver para salvar o arquivo
        FileSaver.saveAs(blob, "usuarios.csv");
      })
      .catch((error) => {
        console.log(error);
      });
  }


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
            {/* Botão para criar um novo usuário */}
            <Button  label="gerar CSV" onClick={gerarCSV}/>
             
            
            
            <Button label="Criar usuário" onClick={openCreateUserModal} />
            {/* Mapeia a lista de usuários e renderiza os cartões de usuário */}
            {userList.map((user) => {
              return (
                <Card
                  key={user.id}
                  // Função para abrir o modal de edição de usuário
                  openModalEdit={() => openEditUserModal(user)}
                  // Função para abrir o modal de exclusão de usuário
                  opemModalDelete={() => openDeleteUserModal(user)}
                >
                  {/* Informações do usuário exibidas no cartão */}
                  <CardInfo title="ID" data={user.id} />
                  <CardInfo title="Nome" data={user.nome} />
                  <CardInfo title="E-mail" data={user.email} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {/* Renderiza os modais */}
      {createUserModal}
      {editUserModal}
      {deleteUserModal}
    </AuthGuard>
  );
}
