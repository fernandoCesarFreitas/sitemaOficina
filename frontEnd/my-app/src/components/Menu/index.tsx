import Link from "next/link";
import { Alien, Atom, GearSix, User, Bicycle, Person , Spiral, Wrench, Money, ClipboardText, Package} from "phosphor-react";
import {
  MenuContainer,
  ContentContainer,
  NavLinkContainer,
  NavLink,
} from "./styles";
const RotatingSpiral = () => {
  
    return (
      <Spiral  weight="bold" size={62} alt="Home" >
        <animate
          values="0;1;0"
          dur="6s"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="8s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </Spiral>
    );
  };
  


export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <NavLink href="/home">
        <RotatingSpiral/>{/*logo*/}
        </NavLink>
        <NavLinkContainer>
          <NavLink href="/users">
            <User size={32} alt="Usuários"/>{/*usuario*/}
          </NavLink>
          <NavLink href="/bicicletas">
            <Bicycle size={32} alt="Bicicletas"/>{/*bike*/}
          </NavLink>
          <NavLink href="/clientes">
            <Person size={32} alt="Clientes"/>{/*clientes*/}
          </NavLink>
          <NavLink href="/servicos">
            <Wrench size={32} alt="Serviços"/>{/*servicos*/}
          </NavLink>
          <NavLink href="/financeiro">
            <Money size={32} alt="Financeiro"/>{/*financeiro*/}
          </NavLink>
          <NavLink href="/itens">
            <Package size={32} alt="Itens"/>{/*itens*/}
          </NavLink>
          <NavLink href="/tiposervico">
            <GearSix size={32}alt="Tipo de Serviços" />{/*tipo de servicos*/}
          </NavLink>
          <NavLink href="/relatorios">
            <ClipboardText size={32} alt="Relatórios"/>{/*relatorios*/}
          </NavLink>
        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}
