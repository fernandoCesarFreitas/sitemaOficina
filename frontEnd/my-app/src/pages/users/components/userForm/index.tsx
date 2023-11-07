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

interface UserModalProps {
  closeModal: Function;
  userData?: User;
}

const newUserValidationSchema = zod
  .object({
    nome: zod.string().min(1, "Informe um nome válido"),
    email: zod
      .string()
      .min(1, "Informe a sua senha")
      .email("Informe um e-mail válido"),
    senha: zod.string().min(6, "Sua senha deve conter 5 digitos"),
    password_confirm: zod.string().min(6, "Sua senha deve conter 5 digitos"),
  })
  .refine((data) => data.senha === data.password_confirm, {
    message: "As Senhas devem ser iguais",
    path: ["password_confirm"],
  });

type UserData = zod.infer<typeof newUserValidationSchema>;

export function UserForm({ closeModal, userData }: UserModalProps) {
  const methods = useForm<UserData>({
    resolver: zodResolver(newUserValidationSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      password_confirm: "",
    },
  });

  const { handleSubmit, formState, setValue } = methods;

  useEffect(() => {
    if (userData) {
      setValue("nome", userData.nome);
      setValue("email", userData.email);
    }
  }, [setValue, userData]);

  const { errors } = formState;

  async function handleCrateEditUser(data: UserData) {
    console.log(data);
    try {
      if (userData) {
        await axios.put(`http://localhost:3000/usuarios/${userData.id}`, data);

        toast.success("Usuário Editado com sucesso");
      } else {
        await axios.post("http://localhost:3000/usuarios", data);

        toast.success("Usuário Criado com sucesso");
      }

      closeModal();
    } catch (error) {
      toast.error("Erro ao criar/editar usuário");
    }
  }

  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form onSubmit={handleSubmit(handleCrateEditUser)}>
          <ItemsFormContainer>
            <Input label="Nome" id="nome" error={errors.nome?.message} />
            <Input
              label="Email"
              id="email"
              error={errors.email?.message}
            />
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
