import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "./components/card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";
import { UserContainer, ContentContainer } from "./styles";
import {Bike} from "../bicicletas";
import { Customer } from "../clientes";
import {Item} from "../itens";

export type Order = {
  id: number;
  dataEntrada: string;
  dataSaida: string; //pode ser null
  descricao: string;
  status: string;
  valor: string;
  observacoes: string; //pode ser null
  bicicleta_id: string;
  clienteId: string;
  financeiro_id: string;
  itensUtilizadosId: string;
  bicicleta: Bike;
  cliente: Customer;
  itensUtilizados: Item;
};

export default function OConcluidos() {
  const [odList, setOdList] = useState<Order[]>();

  useEffect(() => {
    axios
      .get<Order[]>("http://localhost:3000/servicosConcluidos")
      .then((response) => setOdList(response.data));
  }, []);

  const formatarData = (data: string) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, "0");
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };
  return (
    <>
      <AuthGuard>
        <Header label="Serviços Concluídos" />
        <UserContainer>
          <Menu />
          <ContentContainer>
            
         
            {odList?.map((user) => {
              return (
                <Card key={user.id}>
                  <CardInfo title="ID" data={user.id} />
                  <CardInfo title="Data Entrada" data={formatarData(user.dataEntrada)} />
                  <CardInfo title="Data Saída" data={user.dataSaida} />
                  <CardInfo title="Cliente" data={user.cliente.nome} />
                </Card>
              );
            })}
          </ContentContainer>
        </UserContainer>
      </AuthGuard>
    </>
  );
}