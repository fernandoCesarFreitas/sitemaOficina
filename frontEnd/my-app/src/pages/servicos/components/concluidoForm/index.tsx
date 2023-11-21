import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Order } from "../..";

// Definição das propriedades necessárias para o UserForm
interface ConcluidoModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário

// Componente funcional UserForm
export function ConcluidoModal({ closeModal, orderData }: ConcluidoModalProps) {

  async function handleConcluidoOs() {
    try {
      if (orderData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.delete(`http://localhost:3000/servicosConcluidos/${orderData.id}`);
        toast.success("Ordem de serviço Concluída com sucesso!");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao Concluir ordem de serviço!");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      <span> Tem certeza que deseja Concluir esta ordem de serviço?</span>

      <ButtonContainer>
        {/* Botões de enviar e cancelar */}
        <Button label="Concluir" type="submit" onClick={handleConcluidoOs} />
        <Button
          label="Cancelar"
          variant="danger"
          onClick={() => closeModal()}
        />
      </ButtonContainer>
    </DivContainer>
  );
}
