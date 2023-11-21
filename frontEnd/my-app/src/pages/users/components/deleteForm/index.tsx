// DeleteModal.js
import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { User } from "@/contexts/AuthContext";

// Definição das propriedades necessárias para o DeleteModal
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  userData?: User; // Dados do usuário a serem deletados, se existirem
}

// Componente funcional DeleteModal
export function DeleteModal({ closeModal, userData }: DeleteModalProps) {

  // Função assíncrona para lidar com a exclusão do usuário
  async function handleDeleteUser() {
    try {
      if (userData) {
        // Se existirem dados do usuário, realiza a requisição DELETE para exclusão
        await axios.delete(`http://localhost:3000/usuarios/${userData.id}`);
        toast.success("Usuário deletado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    }
  }

  // Renderização do componente DeleteModal
  return (
    <DivContainer>
      <span> Tem certeza que deseja excluir este usuário?</span>

      <ButtonContainer>
        {/* Botões de deletar e cancelar */}
        <Button label="Deletar" type="submit" onClick={handleDeleteUser} />
        <Button
          label="Cancelar"
          variant="danger"
          onClick={() => closeModal()}
        />
      </ButtonContainer>
    </DivContainer>
  );
}
