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
import { TypeForm } from "./paymentForm";

export type Pay = {
  id: number;
  nome: string;
  situacao: string;
};


const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal tipos
export default function Payment() {
  const [payList, setPayList] = useState<Pay[]>([]); // Estado para armazenar a lista de usuários
  const [isModalCreatePayOpen, setIsModalCreatePayOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditPayOpen, setIsModalEditPayOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [pay, setPay] = useState<Pay>(); // Estado para armazenar os dados de um usuário específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(pay: Pay) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir o mode de pagamento ${pay.nome}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<Pay>(`http://localhost:3000/MetodosDePagamentos/${pay.id}`)
        .then(() => {
          toast.success("Pagamento deletado com sucesso!"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setPayList(payList.filter((u) => u.id !== pay.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar Pagamento"); // Exibe mensagem de erro
          console.error("Erro ao excluir Pagamento: ", error);
        });
    }
  }

  // Função para abrir o modal de criação de usuário
  function openCreatePayModal() {
    setIsModalCreatePayOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreatePayModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<Pay[]>("http://localhost:3000/MetodosDePagamentos").then((response) => {
      setPayList(response.data);
    });
    setIsModalCreatePayOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditPayModal(editPay: Pay) {
    setPay(editPay);
    setIsModalEditPayOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditPayModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<Pay[]>("http://localhost:3000/MetodosDePagamentos").then((response) => {
      setPayList(response.data);
    });
    setIsModalEditPayOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<Pay[]>("http://localhost:3000/MetodosDePagamentos").then((response) => {
      setPayList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createPayModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreatePayOpen}
        onRequestClose={closeCreatePayModal}
        contentLabel="Modal de Criação de Tipos de pagamentos"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Tipo de Pagamento</h1>
        <TypeForm closeModal={closeCreatePayModal} />
      </ModalContainer>
    );
  }, [isModalCreatePayOpen]);

  // Cria o modal de edição de usuário
  const editPayModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditPayOpen}
        onRequestClose={closeEditPayModal}
        contentLabel="Modal de Edição de tipo de pagamento"
        style={customModalStyles as Styles}
      >
        <h1>Editar modo de pagamento</h1>
        <TypeForm closeModal={closeEditPayModal} payData={pay} />
      </ModalContainer>
    );
  }, [isModalEditPayOpen, pay]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Tipos de Pagamentos" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar Tipo de Pagamento" onClick={openCreatePayModal} />
          {payList.map((pay) => {
            return (
              <Card
                key={pay.id}
                openModal={() => openEditPayModal(pay)}
                onDelete={() => handleDelete(pay)}
              >
                <CardInfo title="ID" data={pay.id} />
                <CardInfo title="nome" data={pay.nome} />
                <CardInfo title="Situação" data={pay.situacao} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createPayModal}
      {editPayModal}
    </AuthGuard>
  );
}

