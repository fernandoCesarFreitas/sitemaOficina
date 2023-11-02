import Link from "next/link";
import { Alien, Atom, GearSix, User, Bicycle, Person , Spiral, Wrench, Money, ClipboardText, Package} from "phosphor-react";
import {
  MenuContainer,
  ContentContainer,
  NavLinkContainer,
  NavLink,
} from "./styles";

export function Menu() {
  return (
    <MenuContainer>
      <ContentContainer>
        <NavLink href="/home">
        <Spiral size={62} />{/*logo*/}
        </NavLink>
        <NavLinkContainer>
          <NavLink href="/users">
            <User size={32} />{/*usuario*/}
          </NavLink>
          <NavLink href="/bicicletas">
            <Bicycle size={32} />{/*bike*/}
          </NavLink>
          <NavLink href="/clientes">
            <Person size={32} />{/*clientes*/}
          </NavLink>
          <NavLink href="/servicos">
            <Wrench size={32} />{/*servicos*/}
          </NavLink>
          <NavLink href="/financeiro">
            <Money size={32} />{/*financeiro*/}
          </NavLink>
          <NavLink href="/itens">
            <Package size={32} />{/*itens*/}
          </NavLink>
          <NavLink href="/tiposervico">
            <GearSix size={32} />{/*tipo de servicos*/}
          </NavLink>
          <NavLink href="/relatorios">
            <ClipboardText size={32} />{/*relatorios*/}
          </NavLink>
        </NavLinkContainer>
      </ContentContainer>
    </MenuContainer>
  );
}
