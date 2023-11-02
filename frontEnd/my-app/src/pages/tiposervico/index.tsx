import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Header/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer } from "./styles";

export default function Users() {
  const [userList, setUserList] = useState<User[]>();

  useEffect(() => {
    axios
      .get<User[]>("http://localhost:3000/tipoServico")
      .then((response) => setUserList(response.data));
  }, []);

  return (
    <>
      <AuthGuard>
        <Header label="Tipo de Serviços" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            <Button label="Criar Serviço" />
            {userList?.map((user) => {
              return (
                <Card key={user.id}>
                  <CardInfo title="ID" data={user.id} />
                  <CardInfo title="Descrição" data={user.nome} />
                  <CardInfo title="Valor" data={user.email} />
                </Card>
              );
            })}
          </ContentContainer>
        </UserContainer>
      </AuthGuard>
    </>
  );
}