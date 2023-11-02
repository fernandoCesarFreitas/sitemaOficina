import { AuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/button";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { Header } from "@/components/Header";
import { Menu } from "@/components/Menu";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  return (
    <AuthGuard>
      
      <Header label="Home"/>
      <Menu/>
    </AuthGuard>
  );
}
