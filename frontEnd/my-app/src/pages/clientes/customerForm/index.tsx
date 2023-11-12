import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Customer } from "..";

// Definição das propriedades necessárias para o UserForm
interface CustomerModalProps {
  closeModal: Function; // Função para fechar o modal
  customerData?: Customer; // Dados do tipo, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newCustomerValidationSchema = zod.object({
  nome: zod.string().min(1, "Informe uma nome válido"),
  telefone: zod.string().min(1, "Informe um telefone válido"),
});

// Tipo dos dados do usuário baseado no esquema de validação
type CustomerData = zod.infer<typeof newCustomerValidationSchema>;

// Componente funcional UserForm
export function TypeForm({ closeModal, customerData }: CustomerModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<CustomerData>({
    resolver: zodResolver(newCustomerValidationSchema),
    defaultValues: {
      nome: "",
      telefone: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (customerData) {
      setValue("nome", customerData.nome);
      setValue("telefone", customerData.telefone);
    }
  }, [setValue, customerData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditType(data: CustomerData) {
    try {
      console.log(data);
      if (customerData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(
          `http://localhost:3000/clientes/${customerData.id}`,
          data
        );
        toast.success("Cliente editado com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/clientes", data);
        toast.success("Cliente criado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar Cliente");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditType)}>
          <ItemsFormContainer>
            {/* Inputs do formulário com os respectivos erros */}
            <Input
              label="Nome"
              id="nome"
              error={errors.nome?.message}
            />
            <Input label="Telefone" id="telefone" error={errors.telefone?.message} />
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
