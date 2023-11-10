import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Header/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { toast } from "react-toastify";
import { Styles } from "react-modal";
import { TypeForm } from "./typeForm";

export type Tipo = {
  id: number;
  descricao: string;
  valor: string;
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
export default function Types() {
  const [typeList, setTypeList] = useState<Tipo[]>([]); // Estado para armazenar a lista de usuários
  const [isModalCreateTypeOpen, setIsModalCreateTypeOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditTypeOpen, setIsModalEditTypeOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [type, setType] = useState<Tipo>(); // Estado para armazenar os dados de um usuário específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(tipo: Tipo) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir o tipo ${tipo.descricao}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<Tipo>(`http://localhost:3000/tipoServico/${tipo.id}`)
        .then(() => {
          toast.success("tipo deletado com sucesso"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setTypeList(typeList.filter((u) => u.id !== tipo.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar Tipo"); // Exibe mensagem de erro
          console.error("Erro ao excluir tipo: ", error);
        });
    }
  }

  // Função para abrir o modal de criação de usuário
  function openCreateTypeModal() {
    setIsModalCreateTypeOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreateTypeModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<Tipo[]>("http://localhost:3000/tipoServico").then((response) => {
      setTypeList(response.data);
    });
    setIsModalCreateTypeOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditTypeModal(editType: Tipo) {
    setType(editType);
    setIsModalEditTypeOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditTypeModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<Tipo[]>("http://localhost:3000/tipoServico").then((response) => {
      setTypeList(response.data);
    });
    setIsModalEditTypeOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<Tipo[]>("http://localhost:3000/tipoServico").then((response) => {
      setTypeList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createTypeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateTypeOpen}
        onRequestClose={closeCreateTypeModal}
        contentLabel="Modal de Criação de Tipos de Serviço"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Tipo de Serviço</h1>
        <TypeForm closeModal={closeCreateTypeModal} />
      </ModalContainer>
    );
  }, [isModalCreateTypeOpen]);

  // Cria o modal de edição de usuário
  const editTypeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditTypeOpen}
        onRequestClose={closeEditTypeModal}
        contentLabel="Modal de Edição de tipo de serviço"
        style={customModalStyles as Styles}
      >
        <h1>Editar Usuário</h1>
        <TypeForm closeModal={closeEditTypeModal} typeData={type} />
      </ModalContainer>
    );
  }, [isModalEditTypeOpen, type]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Usuários" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar Tipo de Serviço" onClick={openCreateTypeModal} />
          {typeList.map((type) => {
            return (
              <Card
                key={type.id}
                openModal={() => openEditTypeModal(type)}
                onDelete={() => handleDelete(type)}
              >
                <CardInfo title="ID" data={type.id} />
                <CardInfo title="Descrição" data={type.descricao} />
                <CardInfo title="Valor" data={type.valor} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createTypeModal}
      {editTypeModal}
    </AuthGuard>
  );
}

