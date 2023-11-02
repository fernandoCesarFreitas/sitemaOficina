// components/AuthGuard.tsx
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import Loading from "../Loading";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { user, getLogged, loading } = useContext(AuthContext);

  useEffect(() => {
    if (user) return;
    async function getUser() {
      getLogged();
    }

    getUser();
  }, [getLogged, user]);

  if (loading) {
    return <Loading />;
  } else if (!user) {
    router.push("/login");
  } else {
    return <>{children}</>;
  }
}