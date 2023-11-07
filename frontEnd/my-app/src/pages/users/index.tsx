import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Header/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer, ModalContainer } from "./styles";
import { UserForm } from "./components/userForm";

export default function Users() {
  const [userList, setUserList] = useState<User[]>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const customModalStyles = {
    content: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3000/usuarios")
      .then((response) => setUserList(response.data));
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <AuthGuard>
        <Header label="Usuários" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            <Button label="Criar usuário" onClick={openModal} />
            {userList?.map((user) => {
              return (
                <Card key={user.id}>
                  <CardInfo title="ID" data={user.id} />
                  <CardInfo title="Nome" data={user.nome} />
                  <CardInfo title="E-mail" data={user.email} />
                </Card>
              );
            })}
          </ContentContainer>
        </UserContainer>
      </AuthGuard>
      <ModalContainer isOpen={isModalOpen} style={customModalStyles}>
        <h1>criar usuario</h1>
        <UserForm />
      </ModalContainer>
    </>
  );
}
