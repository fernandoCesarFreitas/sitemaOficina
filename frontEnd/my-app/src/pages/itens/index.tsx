import { AuthGuard } from "@/components/AuthGuard";
import { Card, CardInfo } from "@/components/Card";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { Button } from "@/components/button";
import { Styles } from "react-modal";
import { ItemForm } from "./components/userForm";
import { User } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { DeleteModal } from "./components/deleteForm";
import Loading from "@/components/Loading";

// Estilos personalizados para os modais
const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

export type Item = {
  id: number;
  nome: string;
  marca: string;
  valor: string;
  quantidade: string;
  maoDeObra: string;
};

//Componente principal Users
export default function Item() {
  // Estado para armazenar a lista de usuários
  const [itemList, setItemList] = useState<Item[]>([]);

  // Estados para controlar a abertura dos modais
  const [isModalCreateItemOpen, setIsModalCreateItemOpen] = useState(false);
  const [isModalEditItemOpen, setIsModalEditItemOpen] = useState(false);
  const [isModalDeleteItemOpen, setIsModalDeleteItemOpen] = useState(false);

  // Estado para armazenar os dados de um usuário específico
  const [item, setItem] = useState<Item>();

  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(false);

  // Função assíncrona para buscar a lista de usuários
  const fetchItem = useCallback(async () => {
    setLoading(true);
    await axios.get<Item[]>("http://localhost:3000/itens").then((response) => {
      setItemList(response.data);
    });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateItemModal() {
    setIsModalCreateItemOpen(true);
  }

  // Função assíncrona para fechar o modal de criação de usuário e atualizar a lista de usuários
  const closeCreateItemModal = useCallback(async () => {
    setIsModalCreateItemOpen(false);
    await fetchItem();
  }, [fetchItem]);

  // Função para abrir o modal de edição de usuário
  function openEditItemModal(editItem: Item) {
    setItem(editItem);
    setIsModalEditItemOpen(true);
  }

  // Função assíncrona para fechar o modal de edição de usuário e atualizar a lista de usuários
  const closeEditItemModal = useCallback(async () => {
    setIsModalEditItemOpen(false);
    await fetchItem();
  }, [fetchItem]);

  // Função para abrir o modal de exclusão de usuário
  function openDeleteItemModal(editItem: Item) {
    setItem(editItem);
    setIsModalDeleteItemOpen(true);
  }

  // Função assíncrona para fechar o modal de exclusão de usuário e atualizar a lista de usuários
  const closeDeleteItemModal = useCallback(async () => {
    setIsModalDeleteItemOpen(false);
    await fetchItem();
  }, [fetchItem]);

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    fetchItem();
  }, [fetchItem]);

  // Cria o modal de criação de usuário
  const createItemModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateItemOpen}
        onRequestClose={closeCreateItemModal}
        contentLabel="Modal de Criação de Itens"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Item</h1>
        <ItemForm closeModal={closeCreateItemModal} />
      </ModalContainer>
    );
  }, [closeCreateItemModal, isModalCreateItemOpen]);

  // Cria o modal de edição de usuário
  const editItemModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditItemOpen}
        onRequestClose={closeEditItemModal}
        contentLabel="Modal de Edição de Itens"
        style={customModalStyles as Styles}
      >
        <h1>Editar Usuário</h1>
        <ItemForm closeModal={closeEditItemModal} itemData={item} />
      </ModalContainer>
    );
  }, [closeEditItemModal, isModalEditItemOpen, item]);

  // Cria o modal de exclusão de usuário
  const deleteItemModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteItemOpen}
        onRequestClose={closeDeleteItemModal}
        contentLabel="Modal de Deletar Itens"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Item</h1>
        <DeleteModal closeModal={closeDeleteItemModal} itemData={item} />
      </ModalContainer>
    );
  }, [closeDeleteItemModal, isModalDeleteItemOpen, item]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Itens" />
      <UserContainer>
        <Menu />
        {loading ? (
          <Loading />
        ) : (
          <ContentContainer>
            {/* Botão para criar um novo usuário */}
            <Button label="Criar Item" onClick={openCreateItemModal} />
            {/* Mapeia a lista de usuários e renderiza os cartões de usuário */}
            {itemList.map((item) => {
              return (
                <Card
                  key={item.id}
                  // Função para abrir o modal de edição de usuário
                  openModalEdit={() => openEditItemModal(item)}
                  // Função para abrir o modal de exclusão de usuário
                  opemModalDelete={() => openDeleteItemModal(item)}
                >
                  {/* Informações do usuário exibidas no cartão */}
                  <CardInfo title="ID" data={item.id} />
                  <CardInfo title="Nome" data={item.nome} />
                  <CardInfo title="Marca" data={item.marca} />
                  <CardInfo title="Quantidade" data={item.quantidade} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {/* Renderiza os modais */}
      {createItemModal}
      {editItemModal}
      {deleteItemModal}
    </AuthGuard>
  );
}
