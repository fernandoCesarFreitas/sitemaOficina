import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Header/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import Modal, { Styles } from "react-modal";
import { UserForm } from "./components/userForm";
import { User } from "@/contexts/AuthContext";

const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [isModalCreateUserOpen, setIsModalCreateUserOpen] = useState(false);
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [user, setUser] = useState<User>();

  function handleDelete(user: User) {
    console.log(user);
    axios.delete<User>(`http://localhost:3000/usuarios/${user.id}`).then((response) => {
      // axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      //   setUserList(response.data);
      });
    // });
  }

  function openCreateUserModal() {
    setIsModalCreateUserOpen(true);
  }

  function closeCreateUserModal() {
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
    setIsModalCreateUserOpen(false);
  }

  function openEditUserModal(editUser: User) {
    setUser(editUser);
    setIsModalEditUserOpen(true);
  }

  function closeEditUserModal() {
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
    setIsModalEditUserOpen(false);
  }

  useEffect(() => {
    axios.get<User[]>("http://localhost:3000/usuarios").then((response) => {
      setUserList(response.data);
    });
  }, []);

  const createUserModal = useMemo(() => {
    // Realiza uma operação computacionalmente custosa com base nos dados
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
  }, [isModalCreateUserOpen]); // Apenas criar a modal quando isModalOpen mudar

  const editUserModal = useMemo(() => {
    // Realiza uma operação computacionalmente custosa com base nos dados
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
  }, [isModalEditUserOpen, user]); // Apenas criar a modal quando isModalOpen mudar

  return (
    <AuthGuard>
      <Header label="Users" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar usuário" onClick={openCreateUserModal} />
          {userList.map((user) => {
            return (
              <Card key={user.id} openModal={() => openEditUserModal(user)}  onDelete={() => handleDelete(user)}>
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
