import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { toast } from "react-toastify";
import { Styles } from "react-modal";
import { CustomerForm } from "./components/customerForm";
import { DeleteModal } from "./components/deleteForm";
import Loading from "@/components/Loading";

export type Customer = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  cidade: string;
  status: string;
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

// Componente principal Users
export default function Customers() {
  // Estado para armazenar a lista de usuários
  const [customerList, setCustomerList] = useState<Customer[]>([]);

  // Estados para controlar a abertura dos modais
  const [isModalCreateCustomerOpen, setIsModalCreateCustomerOpen] = useState(false);
  const [isModalEditCustomerOpen, setIsModalEditCustomerOpen] = useState(false);
  const [isModalDeleteCustomerOpen, setIsModalDeleteCustomerOpen] = useState(false);

  // Estado para armazenar os dados de um usuário específico
  const [customer, setCustomer] = useState<Customer>();

  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(false);

  // Função assíncrona para buscar a lista de usuários
  const fetchCustomer = useCallback(async () => {
    setLoading(true);
    await axios.get<Customer[]>("http://localhost:3000/clientes").then((response) => {
      setCustomerList(response.data);
    });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateCustomerModal() {
    setIsModalCreateCustomerOpen(true);
  }

  // Função assíncrona para fechar o modal de criação de usuário e atualizar a lista de usuários
  const closeCreateCustomerModal = useCallback(async () => {
    setIsModalCreateCustomerOpen(false);
    await fetchCustomer();
  }, [fetchCustomer]);

  // Função para abrir o modal de edição de usuário
  function openEditCustomerModal(editCustomer: Customer) {
    setCustomer(editCustomer);
    setIsModalEditCustomerOpen(true);
  }

  // Função assíncrona para fechar o modal de edição de usuário e atualizar a lista de usuários
  const closeEditCustomerModal = useCallback(async () => {
    setIsModalEditCustomerOpen(false);
    await fetchCustomer();
  }, [fetchCustomer]);

  // Função para abrir o modal de exclusão de usuário
  function openDeleteCustomerModal(editCustomer: Customer) {
    setCustomer(editCustomer);
    setIsModalDeleteCustomerOpen(true);
  }

  // Função assíncrona para fechar o modal de exclusão de usuário e atualizar a lista de usuários
  const closeDeleteCustomerModal = useCallback(async () => {
    setIsModalDeleteCustomerOpen(false);
    await fetchCustomer();
  }, [fetchCustomer]);

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  // Cria o modal de criação de usuário
  const createCustomerModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateCustomerOpen}
        onRequestClose={closeCreateCustomerModal}
        contentLabel="Modal de Criação de Usuário"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Cliente</h1>
        <CustomerForm closeModal={closeCreateCustomerModal} />
      </ModalContainer>
    );
  }, [closeCreateCustomerModal, isModalCreateCustomerOpen]);

  // Cria o modal de edição de usuário
  const editCustomerModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditCustomerOpen}
        onRequestClose={closeEditCustomerModal}
        contentLabel="Modal de Edição de Clientes"
        style={customModalStyles as Styles}
      >
        <h1>Editar Cliente</h1>
        <CustomerForm closeModal={closeEditCustomerModal} customerData={customer} />
      </ModalContainer>
    );
  }, [closeEditCustomerModal, isModalEditCustomerOpen, customer]);

  // Cria o modal de exclusão de usuário
  const deleteCustomerModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteCustomerOpen}
        onRequestClose={closeDeleteCustomerModal}
        contentLabel="Modal de Deletar Cliente"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Cliente</h1>
        <DeleteModal closeModal={closeDeleteCustomerModal} customerData={customer} />
      </ModalContainer>
    );
  }, [closeDeleteCustomerModal, isModalDeleteCustomerOpen, customer]);

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
            <Button label="Criar Cliente" onClick={openCreateCustomerModal} />
            {/* Mapeia a lista de usuários e renderiza os cartões de usuário */}
            {customerList.map((customer) => {
              return (
                <Card
                  key={customer.id}
                  // Função para abrir o modal de edição de usuário
                  openModalEdit={() => openEditCustomerModal(customer)}
                  // Função para abrir o modal de exclusão de usuário
                  opemModalDelete={() => openDeleteCustomerModal(customer)}
                >
                  {/* Informações do usuário exibidas no cartão */}
                  <CardInfo title="ID" data={customer.id} />
                  <CardInfo title="Nome" data={customer.nome} />
                  <CardInfo title="E-mail" data={customer.email} />
                  <CardInfo title="Telefone" data={customer.telefone} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {/* Renderiza os modais */}
      {createCustomerModal}
      {editCustomerModal}
      {deleteCustomerModal}
    </AuthGuard>
  );
}