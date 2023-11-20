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

// Definição das propriedades necessárias para o UserForm
interface OrderModalProps {
  closeModal: Function; // Função para fechar o modal
  orderData?: Order; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newUserValidationSchema = zod.object({
  descricao: zod.string().min(1, "Informe um nome válido"),
  dataSaida: zod.string().nullable(),
  valor: zod.string().min(1, "Informe um valor válido"),
  observacoes: zod.string().nullable(),
  bicicletaId: zod.string().min(1, "Informe um id válido"),
  clienteId: zod.string().min(1, "Informe um id válido"),
  itensUtilizadosId: zod.string(),
});

// Tipo dos dados do usuário baseado no esquema de validação
type OrderData = zod.infer<typeof newUserValidationSchema>;

// Componente funcional UserForm
export function OrderForm({ closeModal, orderData }: OrderModalProps) {
  console.log(orderData);
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<OrderData>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      descricao: "",
      dataSaida: "",
      valor: "",
      observacoes: "",
      bicicletaId: "",
      clienteId: "",
      itensUtilizadosId: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    console.log(orderData);
    if (orderData) {
      setValue("descricao", orderData.descricao);
      setValue("dataSaida", orderData.dataSaida);
      setValue("valor", orderData.valor);
      setValue("observacoes", orderData.observacoes);
      setValue("bicicletaId", orderData.bicicleta.id.toString());
      setValue("clienteId", orderData.cliente.id.toString());
      setValue("itensUtilizadosId", orderData.itensUtilizados.id.toString());
    }
  }, [setValue, orderData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditOrder(data: OrderData) {
    try {
      if (orderData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(`http://localhost:3000/servicos/${orderData.id}`, data);
        toast.success("Ordem de serviço editada com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        console.log(data);
        await axios.post("http://localhost:3000/servicos", data);
        toast.success("Ordem de serviço criada com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar Ordem de serviço");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditOrder)}>
          {/* Inputs do formulário com os respectivos erros */}
          <ItemsFormContainer>
            <Input
              label="Descrição"
              name="descricao"
              id="descricao"
              error={errors.descricao?.message}
            />
            <Input
              label="Data de saída"
              name="dataSaida"
              id="dataSaida"
              error={errors.dataSaida?.message}
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
            bikeId={methods.watch("bicicletaId")}
            onBikeChange={(bikeId) =>
              methods.setValue("bicicletaId", bikeId)
            }
            />
            <InputSelectItem
              label="Item"
              id="itensUtilizadosId"
              itemId={methods.watch("itensUtilizadosId")} 
              onItemChange={(itemId) =>
                methods.setValue("itensUtilizadosId", itemId)
              }
              error={errors.itensUtilizadosId?.message}
            />

            <InputSelect
              label="Cliente"
              id="clienteId"
              clienteId={methods.watch("clienteId")} 
              onClienteChange={(clienteId) =>
                methods.setValue("clienteId", clienteId)
              } 
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
