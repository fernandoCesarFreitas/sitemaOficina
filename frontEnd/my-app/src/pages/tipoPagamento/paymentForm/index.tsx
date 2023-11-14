import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Pay } from "..";

// Definição das propriedades necessárias para o UserForm
interface PayModalProps {
  closeModal: Function; // Função para fechar o modal
  payData?: Pay; // Dados do tipo, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newTypeValidationSchema = zod.object({
  nome: zod.string().min(1, "Informe uma nome valido"),
});

// Tipo dos dados do usuário baseado no esquema de validação
type PayData = zod.infer<typeof newTypeValidationSchema>;

// Componente funcional UserForm
export function TypeForm({ closeModal, payData }: PayModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<PayData>({
    resolver: zodResolver(newTypeValidationSchema),
    defaultValues: {
      nome: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (payData) {
      setValue("nome", payData.nome);
    }
  }, [setValue, payData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditType(data: PayData) {
    try {
      console.log(data);
      if (payData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(
          `http://localhost:3000/MetodosDePagamentos/${payData.id}`,
          data
        );
        toast.success("Modo de Pagamento editado com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/MetodosDePagamentos", data);
        toast.success("Modo de Pagamento criado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar modo de Pagamento");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditType)}>
          <ItemsFormContainer>
            {/* Inputs do formulário com os respectivos erros */}
            <Input label="Nome" id="nome" error={errors.nome?.message} />
          </ItemsFormContainer>
          <ButtonContainer>
            {/* Botões de enviar e cancelar */}
            <Button label="Enviar Dados" type="submit" />
            <Button
              label="Cancelar"
              variant="danger"
              onClick={() => closeModal()}
            />
          </ButtonContainer>
        </form>
      </DivContainer>
    </FormProvider>
  );
}
