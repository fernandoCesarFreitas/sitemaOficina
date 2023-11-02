import { InputHTMLAttributes } from "react";
import { ButtonContainer } from "./styles";

interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset" | undefined; //desta forma o type é opcional e pode ser undefined
  width?: number;
  height?: number;
  onClick?: () => void;
}

export function Button({
  label,
  width = 300,
  onClick,
  height = 30,
  ...rest //rest operator - pega todas as propriedades que não foram desestruturadas
}: ButtonProps) {
  return (
    <ButtonContainer width={width} onClick={onClick} heigth={height}>
      {label}
    </ButtonContainer>
  );
}
