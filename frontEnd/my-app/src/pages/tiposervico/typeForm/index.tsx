import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Tipo } from "..";

// Definição das propriedades necessárias para o UserForm
interface TypeModalProps {
  closeModal: Function; // Função para fechar o modal
  typeData?: Tipo; // Dados do tipo, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newTypeValidationSchema = zod.object({
  descricao: zod.string().min(1, "Informe uma descrição válida"),
  valor: zod.string().min(1, "Informe o valor "),
});

// Tipo dos dados do usuário baseado no esquema de validação
type TypeData = zod.infer<typeof newTypeValidationSchema>;

// Componente funcional UserForm
export function TypeForm({ closeModal, typeData }: TypeModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<TypeData>({
    resolver: zodResolver(newTypeValidationSchema),
    defaultValues: {
      descricao: "",
      valor: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (typeData) {
      setValue("descricao", typeData.descricao);
      setValue("valor", typeData.valor);
    }
  }, [setValue, typeData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditType(data: TypeData) {
    try {
      console.log(data);
      if (typeData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(
          `http://localhost:3000/tipoServico/${typeData.id}`,
          data
        );
        toast.success("Serviço editado com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/tipoServico", data);
        toast.success("Serviço criado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar Serviço");
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
              label="Descrição"
              id="descricao"
              error={errors.descricao?.message}
            />
            <Input label="Valor" id="valor" error={errors.valor?.message} />
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
