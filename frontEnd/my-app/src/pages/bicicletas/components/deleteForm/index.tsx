import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Bike } from "../..";

// Definição das propriedades necessárias para o UserForm
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  bikeData?: Bike; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário

// Componente funcional UserForm
export function DeleteModal({ closeModal, bikeData }: DeleteModalProps) {

  async function handleDeleteBike() {
    try {
      if (bikeData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.delete(`http://localhost:3000/bicicletas/${bikeData.id}`);
        toast.success("Bicicleta Deletada com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao deletar bicicleta");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      <span> Tem certeza que deseja excluir esta bicicleta?</span>

      <ButtonContainer>
        {/* Botões de enviar e cancelar */}
        <Button label="Deletar" type="submit" onClick={handleDeleteBike} />
        <Button
          label="Cancelar"
          variant="danger"
          onClick={() => closeModal()}
        />
      </ButtonContainer>
    </DivContainer>
  );
}
