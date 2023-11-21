import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Order } from "../..";

// Definição das propriedades necessárias para o DeleteModal
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados da ordem de serviço, se existirem (para edição)
}

// Componente funcional DeleteModal
export function DeleteModal({ closeModal, orderData }: DeleteModalProps) {

  // Função assíncrona para lidar com a exclusão da ordem de serviço
  async function handleDeleteOs() {
    try {
      if (orderData) {
        // Se existirem dados da ordem de serviço, realiza a requisição DELETE para exclusão
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
      {/* Mensagem de confirmação */}
      <span>Tem certeza que deseja excluir esta ordem de serviço?</span>

      {/* Container para os botões */}
      <ButtonContainer>
        {/* Botões de deletar e cancelar */}
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
