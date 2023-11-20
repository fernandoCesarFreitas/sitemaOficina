import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "./components/card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import { Styles } from "react-modal";
import { OrderForm } from "./components/orderForm";
import Loading from "@/components/Loading";
import { DeleteModal } from "./components/deleteForm";
import { Bike } from "../bicicletas";
import { Customer } from "../clientes";
import { Item } from "../itens";
import { format } from 'date-fns';

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

// Estilos personalizados para os modais
const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal servicos
export default function Os() {
  const [osList, setOsList] = useState<Order[]>([]); // Estado para armazenar a lista de usuários
  const [isModalCreateOsOpen, setIsModalCreateOsOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditOsOpen, setIsModalEditOsOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [isModalDeleteOsOpen, setIsModalDeleteOsOpen] = useState(false);
  const [isModalConcluidoOsOpen, setIsModalConcluidoOsOpen] = useState(false);
  const [os, setOs] = useState<Order>(); // Estado para armazenar os dados de um usuário específico
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento da página

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    await axios
      .get<Order[]>("http://localhost:3000/servicos")
      .then((response) => {
        setOsList(response.data);
      });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateOsModal() {
    setIsModalCreateOsOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  const closeCreateOsModal = useCallback(async () => {
    setIsModalCreateOsOpen(false);
    await fetchOrder();
  }, [fetchOrder]);
  // Atualiza a lista de usuários após o fechamento do modal

  // Função para abrir o modal de edição de usuário
  function openEditOsModal(editOrder: Order) {
    setOs(editOrder);
    setIsModalEditOsOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  const closeEditOsModal = useCallback(async () => {
    setIsModalEditOsOpen(false);
    await fetchOrder();
  }, [fetchOrder]);

  function openDeleteOsModal(editOrder: Order) {
    setOs(editOrder);
    setIsModalDeleteOsOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  const closeDeleteOsModal = useCallback(async () => {
    setIsModalDeleteOsOpen(false);
    await fetchOrder();
  }, [fetchOrder]);

  function openConcluidoOsModal(editOrder: Order) {
    console.log(editOrder);
    setOs(editOrder);
    setIsModalConcluidoOsOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  const closeConcluidoOsModal = useCallback(async () => {
    setIsModalConcluidoOsOpen(false);
    await fetchOrder();
  }, [fetchOrder]);

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  // Cria o modal de criação de usuário
  const createOsModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateOsOpen}
        onRequestClose={closeCreateOsModal}
        contentLabel="Modal de Criação de Serviços"
        style={customModalStyles as Styles}
      >
        <h1>Criar Nova Ordem de Serviço</h1>
        <OrderForm closeModal={closeCreateOsModal} />
      </ModalContainer>
    );
  }, [closeCreateOsModal, isModalCreateOsOpen]);

  // Cria o modal de edição de usuário
  const editOsModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditOsOpen}
        onRequestClose={closeEditOsModal}
        contentLabel="Modal de Edição de SErviços"
        style={customModalStyles as Styles}
      >
        <h1>Editar Serviços</h1>
        <OrderForm closeModal={closeEditOsModal} orderData={os} />
      </ModalContainer>
    );
  }, [closeEditOsModal, isModalEditOsOpen, os]);

  const deleteOsModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteOsOpen}
        onRequestClose={closeDeleteOsModal}
        contentLabel="Modal de exclusão de Serviços"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Ordem de Serviço</h1>
        <DeleteModal closeModal={closeDeleteOsModal} orderData={os} />
      </ModalContainer>
    );
  }, [closeDeleteOsModal, isModalDeleteOsOpen, os]);

  const handleConcluidoClick = async (order: Order) => {
    console.log(order);
    try {
      await axios.delete(`http://localhost:3000/servicos/${order.id}`);
      await fetchOrder(); // Atualiza a lista após a conclusão
    } catch (error) {
      console.error("Erro ao marcar como concluído:", error);
    }
  };
  const formatarData = (data : string) => {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <AuthGuard>
      <Header label="Ordem de Serviço" />
      <UserContainer>
        <Menu />
        {loading ? (
          <Loading />
        ) : (
          <ContentContainer>
            <Button label="Criar Serviço" onClick={openCreateOsModal} />
            {osList.map((os) => {
              return (
                <Card
                  key={os.id}
                  openModalEdit={() => openEditOsModal(os)}
                  openModalDelete={() => openDeleteOsModal(os)}
                  markAsConcluido={() => openConcluidoOsModal(os)}
                  orderData={os}
                >
                  <CardInfo title="ID" data={os.id} />
                  <CardInfo title="Entrada" data={formatarData(os.dataEntrada)} />
                  <CardInfo title="Saída" data={os.dataSaida} />
                  <CardInfo title="Cliente" data={os.cliente.nome} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {createOsModal}
      {editOsModal}
      {deleteOsModal}
    </AuthGuard>
  );
}
