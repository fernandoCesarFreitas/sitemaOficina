import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer } from "./styles";

export default function Users() {
  const [userList, setUserList] = useState<User[]>();

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3000/bicicletas")
      .then((response) => setUserList(response.data));
  }, []);

  return (
    <>
      <AuthGuard>
        <Header label="Bicicletas" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            <Button label="Criar Bicicletas" />
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
    </>
  );
}