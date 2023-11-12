import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { toast } from "react-toastify";
import { Styles } from "react-modal";
import { TypeForm } from "./customerForm";

export type Customer = {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco: string;
  cidade: string;
};


const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal Clientes
export default function Types() {
  const [customerList, setCustomerList ] = useState<Customer[]>([]); // Estado para armazenar a lista de clientes
  const [isModalCreateCustomerOpen, setIsModalCreateCustomerOpen] = useState(false); // Estado para controlar a abertura do modal de criação de cliente
  const [isModalEditCustomerOpen, setIsModalEditCustomerOpen] = useState(false); // Estado para controlar a abertura do modal de edição de cliente
  const [customer, setCustomer] = useState<Customer>(); // Estado para armazenar os dados de um cliente específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(customer: Customer) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir o cliente ${customer.nome}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<Customer>(`http://localhost:3000/clientes/${customer.id}`)
        .then(() => {
          toast.success("tipo deletado com sucesso"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setCustomerList(customerList.filter((u) => u.id !== customer.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar Cliente"); // Exibe mensagem de erro
          console.error("Erro ao excluir Cliente: ", error);
        });
    }
  }

  // Função para abrir o modal de criação de usuário
  function openCreateCustomerModal() {
    setIsModalCreateCustomerOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreateCustomerModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<Customer[]>("http://localhost:3000/clentes").then((response) => {
      setCustomerList(response.data);
    });
    setIsModalCreateCustomerOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditCustomerModal(editCustomer: Customer) {
    setCustomer(editCustomer);
    setIsModalEditCustomerOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditCustomerModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<Customer[]>("http://localhost:3000/clientes").then((response) => {
      setCustomerList(response.data);
    });
    setIsModalEditCustomerOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<Customer[]>("http://localhost:3000/clientes").then((response) => {
      setCustomerList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createCustomerModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateCustomerOpen}
        onRequestClose={closeCreateCustomerModal}
        contentLabel="Modal de Criação de Clientes"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Cliente</h1>
        <TypeForm closeModal={closeCreateCustomerModal} />
      </ModalContainer>
    );
  }, [isModalCreateCustomerOpen]);

  // Cria o modal de edição de usuário
  const editCustomerModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditCustomerOpen}
        onRequestClose={closeEditCustomerModal}
        contentLabel="Modal de Edição Clientes"
        style={customModalStyles as Styles}
      >
        <h1>Editar Cliente</h1>
        <TypeForm closeModal={closeEditCustomerModal} customerData={customer} />
      </ModalContainer>
    );
  }, [isModalEditCustomerOpen, customer]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Usuários" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar Cliente" onClick={openCreateCustomerModal} />
          {customerList.map((customer) => {
            return (
              <Card
                key={customer.id}
                openModal={() => openEditCustomerModal(customer)}
                onDelete={() => handleDelete(customer)}
              >
                <CardInfo title="ID" data={customer.id} />
                <CardInfo title="Nome" data={customer.nome} />
                <CardInfo title="telefone" data={customer.telefone} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createCustomerModal}
      {editCustomerModal}
    </AuthGuard>
  );
}

