import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer } from "./styles";


export type Item = {
  id: number;
  nome: string;
  descricao: string;
  valor: number;
  quantidade: number;
  maoDeObra: string;
  observacoes: string;
};

export default function Itens() {
  const [itemList, setItemList] = useState<Item[]>();

  useEffect(() => {
    axios
      .get<Item[]>("http://localhost:3000/itens")
      .then((response) => setItemList(response.data));
  }, []);

  return (
    <>
      <AuthGuard>
        <Header label="Itens" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            <Button label="Criar Item" />
            {itemList?.map((item) => {
              return (
                <Card key={item.id}>
                  <CardInfo title="ID" data={item.id} />
                  <CardInfo title="Nome" data={item.nome} />
                  <CardInfo title="Descrição" data={item.descricao} />
                  <CardInfo title="Quantidade" data={item.quantidade} />
                </Card>
              );
            })}
          </ContentContainer>
        </UserContainer>
      </AuthGuard>
    </>
  );
}