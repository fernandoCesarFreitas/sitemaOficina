import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Customer } from "../..";

// Definição das propriedades necessárias para o UserForm
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  customerData?: Customer; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário

// Componente funcional UserForm
export function DeleteModal({ closeModal, customerData }: DeleteModalProps) {

  async function handleDeleteCustomer() {
    try {
      if (customerData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.delete(`http://localhost:3000/clientes/${customerData.id}`);
        toast.success("Cliente Deletado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao deletar cliente");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      <span> Tem certeza que deseja excluir este Cliente</span>

      <ButtonContainer>
        {/* Botões de enviar e cancelar */}
        <Button label="Deletar" type="submit" onClick={handleDeleteCustomer} />
        <Button
          label="Cancelar"
          variant="danger"
          onClick={() => closeModal()}
        />
      </ButtonContainer>
    </DivContainer>
  );
}
