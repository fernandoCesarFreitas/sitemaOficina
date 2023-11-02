import { useContext } from "react";
import { Button } from "../button";
import { AuthContext } from "@/contexts/AuthContext";
import { ContentContainer, HeaderContainer, UserContainer } from "./styles";
import { User } from "phosphor-react";

interface HeaderProps {
    label: string
}

export function Header({label}: HeaderProps) {

    const {user, logout} = useContext(AuthContext)
   return (
    <HeaderContainer>
        <ContentContainer>
            <h1>{label}</h1>
            <UserContainer>
                <User size={32} />
                <strong>{user?.nome}</strong> 
                <Button width={100} height={30} label="sair" onClick={logout}/>
            </UserContainer>
        </ContentContainer>
    </HeaderContainer>
   )
}