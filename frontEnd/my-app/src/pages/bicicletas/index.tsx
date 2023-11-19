import { AuthGuard } from "@/components/AuthGuard";
import { Button } from "@/components/button";
import { Header } from "@/components/Header";
import { Card, CardInfo } from "@/components/Card";
import { Menu } from "@/components/Menu";
import { User } from "@/contexts/AuthContext";
import axios from "axios";
import { useCallback ,useEffect, useMemo, useState } from "react";
import { ContentContainer, ModalContainer, UserContainer } from "./styles";
import { toast } from "react-toastify";
import { Styles } from "react-modal";
import { BikeForm } from "./components/bikeForm";
import { DeleteModal } from "./components/deleteForm";
import Loading from "@/components/Loading";

export type Bike = {
  id: number;
  status: string;
  modelo: string;
  tipo: string;
  cor: string;
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
export default function Bike() {
  // Estado para armazenar a lista de usuários
  const [bikeList, setBikeList] = useState<Bike[]>([]);

  // Estados para controlar a abertura dos modais
  const [isModalCreateBikeOpen, setIsModalCreateBikeOpen] = useState(false);
  const [isModalEditBikeOpen, setIsModalEditBikeOpen] = useState(false);
  const [isModalDeleteBikeOpen, setIsModalDeleteBikeOpen] = useState(false);

  // Estado para armazenar os dados de um usuário específico
  const [bike, setBike] = useState<Bike>();

  // Estado para controlar o carregamento da página
  const [loading, setLoading] = useState(false);

  // Função assíncrona para buscar a lista de usuários
  const fetchBike = useCallback(async () => {
    setLoading(true);
    await axios.get<Bike[]>("http://localhost:3000/bicicletas").then((response) => {
      setBikeList(response.data);
    });
    setLoading(false);
  }, []);

  // Função para abrir o modal de criação de usuário
  function openCreateBikeModal() {
    setIsModalCreateBikeOpen(true);
  }

  // Função assíncrona para fechar o modal de criação de usuário e atualizar a lista de usuários
  const closeCreateBikeModal = useCallback(async () => {
    setIsModalCreateBikeOpen(false);
    await fetchBike();
  }, [fetchBike]);

  // Função para abrir o modal de edição de usuário
  function openEditBikeModal(editBike: Bike) {
    setBike(editBike);
    setIsModalEditBikeOpen(true);
  }

  // Função assíncrona para fechar o modal de edição de usuário e atualizar a lista de usuários
  const closeEditBikeModal = useCallback(async () => {
    setIsModalEditBikeOpen(false);
    await fetchBike();
  }, [fetchBike]);

  // Função para abrir o modal de exclusão de usuário
  function openDeleteBikeModal(editBike: Bike) {
    setBike(editBike);
    setIsModalDeleteBikeOpen(true);
  }

  // Função assíncrona para fechar o modal de exclusão de usuário e atualizar a lista de usuários
  const closeDeleteBikeModal = useCallback(async () => {
    setIsModalDeleteBikeOpen(false);
    await fetchBike();
  }, [fetchBike]);

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    fetchBike();
  }, [fetchBike]);

  // Cria o modal de criação de usuário
  const createBikeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateBikeOpen}
        onRequestClose={closeCreateBikeModal}
        contentLabel="Modal de Criação de Bicicletas"
        style={customModalStyles as Styles}
      >
        <h1>Criar Nova Bicicleta</h1>
        <BikeForm closeModal={closeCreateBikeModal} />
      </ModalContainer>
    );
  }, [closeCreateBikeModal, isModalCreateBikeOpen]);

  // Cria o modal de edição de usuário
  const editBikeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditBikeOpen}
        onRequestClose={closeEditBikeModal}
        contentLabel="Modal de Edição de bicicletas"
        style={customModalStyles as Styles}
      >
        <h1>Editar Bicicleta</h1>
        <BikeForm closeModal={closeEditBikeModal} bikeData={bike} />
      </ModalContainer>
    );
  }, [closeEditBikeModal, isModalEditBikeOpen, bike]);

  // Cria o modal de exclusão de usuário
  const deleteBikeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalDeleteBikeOpen}
        onRequestClose={closeDeleteBikeModal}
        contentLabel="Modal de Deletar bicicletas"
        style={customModalStyles as Styles}
      >
        <h1>Deletar Bicicleta</h1>
        <DeleteModal closeModal={closeDeleteBikeModal} bikeData={bike} />
      </ModalContainer>
    );
  }, [closeDeleteBikeModal, isModalDeleteBikeOpen, bike]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Bicicletas" />
      <UserContainer>
        <Menu />
        {loading ? (
          <Loading />
        ) : (
          <ContentContainer>
            {/* Botão para criar um novo usuário */}
            <Button label="Criar Bicicleta" onClick={openCreateBikeModal} />
            {/* Mapeia a lista de usuários e renderiza os cartões de usuário */}
            {bikeList.map((bike) => {
              return (
                <Card
                  key={bike.id}
                  // Função para abrir o modal de edição de usuário
                  openModalEdit={() => openEditBikeModal(bike)}
                  // Função para abrir o modal de exclusão de usuário
                  opemModalDelete={() => openDeleteBikeModal(bike)}
                >
                  {/* Informações do usuário exibidas no cartão */}
                  <CardInfo title="ID" data={bike.id} />
                  <CardInfo title="Modelo" data={bike.modelo} />
                  <CardInfo title="Tipo" data={bike.tipo} />
                  <CardInfo title="Cor" data={bike.cor} />
                </Card>
              );
            })}
          </ContentContainer>
        )}
      </UserContainer>
      {/* Renderiza os modais */}
      {createBikeModal}
      {editBikeModal}
      {deleteBikeModal}
    </AuthGuard>
  );
}