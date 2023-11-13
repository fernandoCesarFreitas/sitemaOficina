import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

import {
  ButtonContainer,
  DivContainer,
  ItemsFormContainer
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Item } from "../..";

// Definição das propriedades necessárias para o UserForm
interface ItemModalProps {
  closeModal: Function; // Função para fechar o modal
  itemData?: Item; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newUserValidationSchema = zod.object({
  nome: zod.string().min(1, "Informe um nome válido"),
  descricao: zod.string().min(1, "Informe uma descrição"),
  valor: zod.string().min(0, "Informe um valor válido"),
  quantidade: zod.string().min(1, "Informe uma quantidade válida"),
  maoDeObra: zod.string().min(0, "Informe uma mão de obra válida"),
});

// Tipo dos dados do usuário baseado no esquema de validação
type ItemData = zod.infer<typeof newUserValidationSchema>;

// Componente funcional UserForm
export function ItemForm({ closeModal, itemData }: ItemModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<ItemData>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      nome: "",
      descricao: "",
      valor: "",
      quantidade: "",
      maoDeObra: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (itemData) {
      setValue("nome", itemData.nome);
      setValue("descricao", itemData.descricao);
      setValue("valor", itemData.valor);
      setValue("quantidade", itemData.quantidade);
      setValue("maoDeObra", itemData.maoDeObra);
    }
  }, [setValue, itemData]);
 

  // Função para manipular a criação ou edição do usuário
  async function handleCrateEditItem(data: ItemData) {
     console.log(data);
    try {
      if (itemData) {
       
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(`http://localhost:3000/itens/${itemData.id}`, data);
        toast.success("Item editado com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/itens", data);
        toast.success("Item criado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar Item");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditItem)}>
          <ItemsFormContainer>
            {/* Inputs do formulário com os respectivos erros */}
            <Input label="Nome" id="nome" error={errors.nome?.message} />
            <Input label="Descrição" id="descricao" error={errors.descricao?.message} />
            <Input label="Valor" id="valor"  error={errors.valor?.message} />
            <Input label="Quantidade" id="quantidade"  error={errors.quantidade?.message} />
            <Input label="Mão de Obra" id="maoDeObra"  error={errors.maoDeObra?.message} />
          </ItemsFormContainer>
          <ButtonContainer>
            {/* Botões de enviar e cancelar */}
            <Button label="Enviar Dados" type="submit" />
            <Button label="Cancelar" variant="danger" onClick={() => closeModal()} />
          </ButtonContainer>
        </form>
      </DivContainer>
    </FormProvider>
  );
}
