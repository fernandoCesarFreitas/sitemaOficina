import { MouseEventHandler, ReactNode } from "react";
import {
  ContentContainer,
  DivContainer,
} from "./Card.styles";
import { Check,  } from "phosphor-react";

interface CardProps {
  children: ReactNode;

}

export function Card({ children }: CardProps) {
  return (
    <DivContainer>
      <ContentContainer>
        {children}
          <Check size={40} color="#D98324" weight="bold" />
      </ContentContainer>
    </DivContainer>
  );
}
