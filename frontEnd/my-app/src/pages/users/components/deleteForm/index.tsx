import { toast } from "react-toastify";
import axios from "axios";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { Button } from "@/components/button";
import { User } from "@/contexts/AuthContext";

// Definição das propriedades necessárias para o UserForm
interface DeleteModalProps {
  closeModal: Function; // Função para fechar o modal
  userData?: User; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário

// Componente funcional UserForm
export function DeleteModal({ closeModal, userData }: DeleteModalProps) {

  async function handleDeleteUser() {
    try {
      if (userData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.delete(`http://localhost:3000/usuarios/${userData.id}`);
        toast.success("Usuário Deletado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao deletar usuário");
    }
  }

  // Renderização do formulário
  return (
    <DivContainer>
      <span> Tem certeza que deseja excluir este usuario</span>

      <ButtonContainer>
        {/* Botões de enviar e cancelar */}
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
