import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Order } from "../..";

// Definição das propriedades necessárias para o UserForm
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário

// Componente funcional UserForm
export function DeleteModal({ closeModal, orderData }: DeleteModalProps) {

  async function handleDeleteOs() {
    try {
      if (orderData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.delete(`http://localhost:3000/servicos/${orderData.id}`);
        toast.success("Ordem de serviço deletada com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao deletar ordem de serviço");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      <span> Tem certeza que deseja excluir esta ordem de serviço?</span>

      <ButtonContainer>
        {/* Botões de enviar e cancelar */}
        <Button label="Deletar" type="submit" onClick={handleDeleteOs} />
        <Button
          label="Cancelar"
          variant="danger"
          onClick={() => closeModal()}
        />
      </ButtonContainer>
    </DivContainer>
  );
}
