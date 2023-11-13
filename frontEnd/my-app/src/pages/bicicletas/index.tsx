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
import { BikeForm } from "./bikeForm";

export type Bike = {
  id: number;
  status: string;
  modelo: string;
  tipo: string;
  cor: string;
};


const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

// Componente principal bikes
export default function Bike() {
  const [bikeList, setBikeList] = useState<Bike[]>([]); // Estado para armazenar a lista de bikes
  const [isModalCreateBikeOpen, setIsModalCreateBikeOpen] = useState(false); // Estado para controlar a abertura do modal de criação de usuário
  const [isModalEditBikeOpen, setIsModalEditBikeOpen] = useState(false); // Estado para controlar a abertura do modal de edição de usuário
  const [bike, setBike] = useState<Bike>(); // Estado para armazenar os dados de um usuário específico

  // Função para lidar com a exclusão de um usuário
  function handleDelete(bike: Bike) {
    // Exibe um prompt de confirmação antes de deletar o usuário
    const confirmDeletion = window.confirm(
      `Tem certeza que deseja excluir a BIcicleta ${bike.modelo}?`
    );

    if (confirmDeletion) {
      // Envia requisição para deletar o usuário
      axios
        .delete<Bike>(`http://localhost:3000/bicicletas/${bike.id}`)
        .then(() => {
          toast.success("bicicleta deletada com sucesso"); // Exibe mensagem de sucesso
          // Atualiza o estado userList após a exclusão do usuário
          setBikeList(bikeList.filter((u) => u.id !== bike.id));
        })
        .catch((error) => {
          toast.error("Erro ao deletar Bicicleta"); // Exibe mensagem de erro
          console.error("Erro ao excluir Bicicleta: ", error);
        });
    }
  }

  // Função para abrir o modal de criação de usuário
  function openCreateBikeModal() {
    setIsModalCreateBikeOpen(true);
  }

  // Função para fechar o modal de criação de usuário
  function closeCreateBikeModal() {
    // Atualiza a lista de usuários após o fechamento do modal
    axios.get<Bike[]>("http://localhost:3000/bicicletas").then((response) => {
      setBikeList(response.data);
    });
    setIsModalCreateBikeOpen(false);
  }

  // Função para abrir o modal de edição de usuário
  function openEditBikeModal(editBike: Bike) {
    setBike(editBike);
    setIsModalEditBikeOpen(true);
  }

  // Função para fechar o modal de edição de usuário
  function closeEditBikeModal() {
    // Atualiza a lista de usuários após o fechamento do modal de edição
    axios.get<Bike[]>("http://localhost:3000/bicicletas").then((response) => {
      setBikeList(response.data);
    });
    setIsModalEditBikeOpen(false);
  }

  // Hook useEffect para carregar a lista de usuários ao carregar a página
  useEffect(() => {
    axios.get<Bike[]>("http://localhost:3000/bicicletas").then((response) => {
      setBikeList(response.data);
    });
  }, []);

  // Cria o modal de criação de usuário
  const createBikeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalCreateBikeOpen}
        onRequestClose={closeCreateBikeModal}
        contentLabel="Modal de Criação de Bicicletas"
        style={customModalStyles as Styles}
      >
        <h1>Criar Novo Bicicleta</h1>
        <BikeForm closeModal={closeCreateBikeModal} />
      </ModalContainer>
    );
  }, [isModalCreateBikeOpen]);

  // Cria o modal de edição de usuário
  const editBikeModal = useMemo(() => {
    return (
      <ModalContainer
        isOpen={isModalEditBikeOpen}
        onRequestClose={closeEditBikeModal}
        contentLabel="Modal de Edição de Bicicletas"
        style={customModalStyles as Styles}
      >
        <h1>Editar Bicicleta</h1>
        <BikeForm closeModal={closeEditBikeModal} bikeData={bike} />
      </ModalContainer>
    );
  }, [isModalEditBikeOpen, bike]);

  // Renderização do componente
  return (
    <AuthGuard>
      <Header label="Bicicletas" />
      <UserContainer>
        <Menu />
        <ContentContainer>
          <Button label="Criar Bicicletas" onClick={openCreateBikeModal} />
          {bikeList.map((bike) => {
            return (
              <Card
                key={bike.id}
                openModal={() => openEditBikeModal(bike)}
                onDelete={() => handleDelete(bike)}
              >
                <CardInfo title="ID" data={bike.id} />
                <CardInfo title="Modelo" data={bike.modelo} />
                <CardInfo title="Tipo" data={bike.tipo} />
                <CardInfo title="Cor" data={bike.cor} />
              </Card>
            );
          })}
        </ContentContainer>
      </UserContainer>
      {createBikeModal}
      {editBikeModal}
    </AuthGuard>
  );
}

