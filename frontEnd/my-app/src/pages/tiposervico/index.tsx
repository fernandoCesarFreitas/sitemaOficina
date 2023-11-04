import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Header/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer } from "./styles";

export type Tipo = {
  id: number;
  descricao: string;
  valor: number;
};

export default function Tipo() {
  const [tipoList, setTipoList] = useState<Tipo[]>();


  useEffect(() => {
    axios
      .get<Tipo[]>("http://localhost:3000/tipoServico")
      .then((response) => setTipoList(response.data));
  }, []);

  return (
    <>
      <AuthGuard>
        <Header label="Tipo de Serviços" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            <Button label="Criar Serviço" />
            {tipoList?.map((tipo) => {
              return (
                <Card key={tipo.id}>
                  <CardInfo title="ID" data={tipo.id} />
                  <CardInfo title="Descrição" data={tipo.descricao} />
                  <CardInfo title="Valor" data={tipo.valor} />
                </Card>
              );
            })}
          </ContentContainer>
        </UserContainer>
      </AuthGuard>
    </>
  );
}