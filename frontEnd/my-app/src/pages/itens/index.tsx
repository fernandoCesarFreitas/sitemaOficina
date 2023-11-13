import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import { Styles } from "react-modal";
import { ItemForm } from "./components/userForm";
import { User } from "@/contexts/AuthContext";
import { toast } from "react-toastify";


export type Item = {
  id: number;
  nome: string;
  descricao: string;
  valor: string;
  quantidade: string;
  maoDeObra: string;
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

// Componente principal items
export default function Items() {
  const [itemList, setItemList] = useState<Item[]>([]); // Estado para armazenar a lista de usuários
  const [isModalCreateItemOpen, setIsModalCreateItemOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditItemOpen, setIsModalEditItemOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [item, setItem] = useState<Item>(); // Estado para armazenar os dados de um usuário específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(item: Item) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir o Item ${item.nome}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<Item>(`http://localhost:3000/itens/${item.id}`)
        .then(() => {
          toast.success("Item deletado com sucesso"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setItemList(itemList.filter((u) => u.id !== item.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar Item"); // Exibe mensagem de erro
          console.error("Erro ao excluir item: ", error);
        });
    }
    toast.success("Item deletado com sucesso"); // Exibe mensagem de sucesso
    axios.get<Item[]>("http://localhost:3000/itens").then((response) => {
      setItemList(response.data);
    });
  }

  // Função para abrir o modal de criação de usuário
  function openCreateItemModal() {
    setIsModalCreateItemOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreateItemModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<Item[]>("http://localhost:3000/itens").then((response) => {
      setItemList(response.data);
    });
    setIsModalCreateItemOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditItemModal(editItem: Item) {
    setItem(editItem);
    setIsModalEditItemOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditItemModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<Item[]>("http://localhost:3000/itens").then((response) => {
      setItemList(response.data);
    });
    setIsModalEditItemOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<Item[]>("http://localhost:3000/itens").then((response) => {
      setItemList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createItemModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateItemOpen}
        onRequestClose={closeCreateItemModal}
        contentLabel="Modal de Criação de itens"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Item</h1>
        <ItemForm closeModal={closeCreateItemModal} />
      </ModalContainer>
    );
  }, [isModalCreateItemOpen]);

  // Cria o modal de edição de usuário
  const editItemModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditItemOpen}
        onRequestClose={closeEditItemModal}
        contentLabel="Modal de Edição de Itens"
        style={customModalStyles as Styles}
      >
        <h1>Editar Item</h1>
        <ItemForm closeModal={closeEditItemModal} itemData={item} />
      </ModalContainer>
    );
  }, [isModalEditItemOpen, item]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Itens" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar Item" onClick={openCreateItemModal} />
          {itemList.map((item) => {
            return (
              <Card
                key={item.id}
                openModal={() => openEditItemModal(item)}
                onDelete={() => handleDelete(item)}
              >
                <CardInfo title="ID" data={item.id} />
                <CardInfo title="Nome" data={item.nome} />
                <CardInfo title="Quantidade" data={item.quantidade} />
                <CardInfo title="Valor" data={item.valor} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createItemModal}
      {editItemModal}
    </AuthGuard>
  );
}

