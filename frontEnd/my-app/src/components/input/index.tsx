import { InputHTMLAttributes } from "react";
import { InputContainer } from "./styles";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  placeholder?: string;
  whidth?: number;
  error?: string;
}

export function Input({
  label,
  id,
  placeholder,
  whidth = 300,
  error,
  ...rest
}: InputProps) {
  const { register } = useFormContext();

  return (
    //
    <InputContainer whidth={whidth}>
      <label htmlFor={id}>{label}</label>
      <input placeholder={placeholder} {...rest} {...register(id)} />
      {error && <span>{error}</span>}
    </InputContainer>
  );
  // register vai criar um name e um ref para o input, o erro fica dinamico e é mostrado apenas se existir no span
}
