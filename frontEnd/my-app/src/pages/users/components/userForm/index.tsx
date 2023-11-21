// UserForm.js
import { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { ButtonContainer, DivContainer, ItemsFormContainer } from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { User } from "@/contexts/AuthContext";

// Definição das propriedades necessárias para o UserForm
interface UserModalProps {
  closeModal: Function; // Função para fechar o modal
  userData?: User; // Dados do usuário, se existirem (para edição)
}

// Esquema de validação para os dados do novo usuário
const newUserValidationSchema = zod
  .object({
    nome: zod.string().min(1, "Informe um nome válido"),
    email: zod
      .string()
      .min(1, "Informe o seu email")
      .email("Informe um e-mail válido"),
    senha: zod.string().min(6, "A senha deve conter pelo menos 6 caracteres"),
    password_confirm: zod
      .string()
      .min(6, "A senha deve conter pelo menos 6 caracteres"),
  })
  .refine((data) => data.senha === data.password_confirm, {
    message: "As senhas devem ser iguais",
    path: ["password_confirm"],
  });

// Tipo dos dados do usuário baseado no esquema de validação
type UserData = zod.infer<typeof newUserValidationSchema>;

// Componente funcional UserForm
export function UserForm({ closeModal, userData }: UserModalProps) {
  // Inicialização do useForm para gerenciar o formulário
  const methods = useForm<UserData>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      password_confirm: "",
    },
  });

  // Desestruturação dos métodos e estado do formulário
  const { handleSubmit, formState, setValue } = methods;

  // Desestruturação dos erros do formulário
  const { errors } = formState;

  // Atualiza os campos do formulário se existirem dados do usuário
  useEffect(() => {
    if (userData) {
      setValue("nome", userData.nome);
      setValue("email", userData.email);
    }
  }, [setValue, userData]);

  // Função para manipular a criação ou edição do usuário
  async function handleCreateEditUser(data: UserData) {
    try {
      if (userData) {
        // Se existirem dados do usuário, realiza a requisição PUT para edição
        await axios.put(`http://localhost:3000/usuarios/${userData.id}`, data);
        toast.success("Usuário editado com sucesso");
      } else {
        // Caso contrário, realiza a requisição POST para criação de um novo usuário
        await axios.post("http://localhost:3000/usuarios", data);
        toast.success("Usuário criado com sucesso");
      }
      closeModal(); // Fecha o modal após o sucesso da requisição
    } catch (error) {
      toast.error("Erro ao criar/editar usuário");
    }
  }

  // Renderização do formulário
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCreateEditUser)}>
          <ItemsFormContainer>
            {/* Inputs do formulário com os respectivos erros */}
            <Input label="Nome" id="nome" error={errors.nome?.message} />
            <Input label="Email" id="email" error={errors.email?.message} />
            <Input
              label="Senha"
              id="senha"
              type="password"
              error={errors.senha?.message}
            />
            <Input
              label="Confirmar a Senha"
              id="password_confirm"
              type="password"
              error={errors.password_confirm?.message}
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
