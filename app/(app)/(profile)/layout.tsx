"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  // Validar si esta iniciado sesion y en caso de no estarlo redirigir a la pagina de inicio
  const { user, isLoading } = useUser();
  useEffect(() => {
    if (!isLoading && !user) {
      window.location.href = "/";
    }

    // Verificar, en caso que este en la pagina de profile/[id] que el [id] coincida con el usuario logueado
    if (!isLoading && user) {
      const url = window.location.href;
      const id = decodeURIComponent(url.split("/").pop() || "");
      console.log(id, user.sub);
      if (id !== user.sub) {
        window.location.href = "/";
      }
    }
  }, [user, isLoading]);

  return <div>{children}</div>;
}
