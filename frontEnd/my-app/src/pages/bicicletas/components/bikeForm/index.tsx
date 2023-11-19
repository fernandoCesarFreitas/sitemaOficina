import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Bike } from "../..";

// Definição das propriedades necessárias para o UserForm
interface BikeModalProps {
  closeModal: Function; // Função para fechar o modal
  bikeData?: Bike; // Dados do tipo, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newBikeValidationSchema = zod.object({
  modelo: zod.string().min(1, "Informe uma descrição válida"),
  tipo: zod.string().min(1, "Informe o tipo "),
  cor: zod.string().min(1, "Informe a cor "),
});

// Tipo dos dados do usuário baseado no esquema de validação
type BikeData = zod.infer<typeof newBikeValidationSchema>;

// Componente funcional UserForm
export function BikeForm({ closeModal, bikeData }: BikeModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<BikeData>({
    resolver: zodResolver(newBikeValidationSchema),
    defaultValues: {
      modelo: "",
      tipo: "",
      cor: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (bikeData) {
      setValue("modelo", bikeData.modelo);
      setValue("tipo", bikeData.tipo);
      setValue("cor", bikeData.cor);
    }
  }, [setValue, bikeData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditBike(data: BikeData) {
    try {
      console.log(data);
      if (bikeData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(
          `http://localhost:3000/bicicletas/${bikeData.id}`,
          data
        );
        toast.success("Bicicleta editada com sucesso!");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/bicicletas", data);
        toast.success("Bicicleta criada com sucesso!");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar Bicicleta");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditBike)}>
          <ItemsFormContainer>
            {/* Inputs do formulário com os respectivos erros */}
            <Input
              label="Modelo"
              id="modelo"
              error={errors.modelo?.message}
            />
            <Input label="Tipo" id="tipo" error={errors.tipo?.message} />
            <Input label="Cor" id="cor" error={errors.cor?.message} />
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
