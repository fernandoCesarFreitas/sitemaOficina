// OrderForm.js
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import InputSelect from "../inputSelect";
import { Button } from "@/components/button";
import { Order } from "../..";
import InputSelectItem from "../inputSelectItem";
import InputSelectBike from "../inputSelectBike";

// Definição das propriedades necessárias para o OrderForm
interface OrderModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados da ordem de serviço, se existirem (para edição)
}

// Esquema de validação para os dados da ordem de serviço
const orderValidationSchema = zod.object({
  descricao: zod.string().min(1, "Informe uma descrição válida"),
  valor: zod.string().min(1, "Informe um valor válido"),
  observacoes: zod.string().nullable(),
  bicicletaId: zod.string().min(1, "Informe um ID de bicicleta válido"),
  clienteId: zod.string().min(1, "Informe um ID de cliente válido"),
  itensUtilizadosId: zod.string().min(1, "Informe um ID de item válido"),
});

// Tipo dos dados da ordem de serviço baseado no esquema de validação
type OrderData = zod.infer<typeof orderValidationSchema>;

// Componente funcional OrderForm
export function OrderForm({ closeModal, orderData }: OrderModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<OrderData>({
    resolver: zodResolver(orderValidationSchema),
    defaultValues: {
      descricao: "",
      valor: "",
      observacoes: "",
      bicicletaId: "",
      clienteId: "",
      itensUtilizadosId: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue, watch } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados da ordem de serviço
  useEffect(() => {
    if (orderData) {
      setValue("descricao", orderData.descricao);
      setValue("valor", orderData.valor);
      setValue("observacoes", orderData.observacoes);
      setValue("bicicletaId", orderData.bicicleta.id.toString());
      setValue("clienteId", orderData.cliente.id.toString());
      setValue("itensUtilizadosId", orderData.itensUtilizados.id.toString());
    }
  }, [setValue, orderData]);

  // Função para manipular a criação ou edição da ordem de serviço
  async function handleCreateEditOrder(data: OrderData) {
    try {
      if (orderData) {
        // Se existirem dados da ordem de serviço, realiza a requisição PUT para edição
        await axios.put(`http://localhost:3000/servicos/${orderData.id}`, data);
        toast.success("Ordem de serviço editada com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de uma nova ordem de serviço
        await axios.post("http://localhost:3000/servicos", data);
        toast.success("Ordem de serviço criada com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar ordem de serviço");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCreateEditOrder)}>
          {/* Inputs do formulário com os respectivos erros */}
          <ItemsFormContainer>
            <Input
              label="Descrição"
              name="descricao"
              id="descricao"
              error={errors.descricao?.message}
            />
            <Input
              label="Valor"
              name="valor"
              id="valor"
              type="number"
              error={errors.valor?.message}
            />
            <Input
              label="Observações"
              name="observacoes"
              id="observacoes"
              error={errors.observacoes?.message}
            />
            <InputSelectBike
              label="Bicicleta"
              id="bicicletaId"
              bikeId={watch("bicicletaId")}
              onBikeChange={(bikeId) => setValue("bicicletaId", bikeId)}
            />
            <InputSelectItem
              label="Item"
              id="itensUtilizadosId"
              itemId={watch("itensUtilizadosId")}
              onItemChange={(itemId) => setValue("itensUtilizadosId", itemId)}
              error={errors.itensUtilizadosId?.message}
            />
            <InputSelect
              label="Cliente"
              id="clienteId"
              clienteId={watch("clienteId")}
              onClienteChange={(clienteId) => setValue("clienteId", clienteId)}
            />
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
