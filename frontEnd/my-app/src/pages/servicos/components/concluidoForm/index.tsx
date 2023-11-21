import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { Order } from "../..";

// Definição das propriedades necessárias para o ConcluidoModal
interface ConcluidoModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados da ordem de serviço, se existirem (para edição)
}

// Componente funcional ConcluidoModal
export function ConcluidoModal({ closeModal, orderData }: ConcluidoModalProps) {

  // Função assíncrona para lidar com a conclusão da ordem de serviço
  async function handleConcluidoOs() {
    try {
      if (orderData) {
        // Se existirem dados da ordem de serviço, realiza a requisição DELETE para conclusão
        await axios.delete(`http://localhost:3000/servicosConcluidos/${orderData.id}`);
        toast.success("Ordem de serviço concluída com sucesso!");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao concluir ordem de serviço!");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      {/* Mensagem de confirmação */}
      <span>Tem certeza que deseja concluir esta ordem de serviço?</span>

      {/* Container para os botões */}
      <ButtonContainer>
        {/* Botões de concluir e cancelar */}
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
