import { FormProvider, useForm } from "react-hook-form";

import { ButtonContainer, DivContainer } from "./styles";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import * as zod from "zod";



const newUservalidationSchema = zod
  .object({
    nome: zod.string().min(3, "Informe um nome Válido").max(50),
    email: zod.string().email("Informe um email válido"),
    senha: zod.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirmarSenha: zod
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas devem ser iguais",
    path: ["senha", "confirmarSenha"]
  });


  type userData = zod.infer<typeof newUservalidationSchema>

export function UserForm() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <DivContainer>
        <form action="">
          <Input label="Nome" id="nome" />
          <Input label="Email" id="email" />
          <Input label="Senha" id="senha" type="password" />
          <Input label="Confirmar Senha" id="confirmarSenha" type="password" />
          <ButtonContainer>
            <Button label="Salvar" />
            <Button label="Cancelar" variant="danger" />
          </ButtonContainer>
        </form>
      </DivContainer>
    </FormProvider>
  );
}
