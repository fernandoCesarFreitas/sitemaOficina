import { InputHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset" | undefined; //desta forma o type é opcional e pode ser undefined
  width?: number;
  height?: number;
  onClick?: () => void;
  variant?: "primary" | "danger" | "secondary";
}

export function Button({
  label,
  width = 200,
  onClick,
  height = 36,
  variant = "primary",
  ...rest //rest operator - pega todas as propriedades que não foram desestruturadas
}: ButtonProps) {
  return (
    <ButtonContainer width={width} onClick={onClick} heigth={height} variant={variant}>
      {label}
    </ButtonContainer>
  );
}
