"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { createUser, useUser as useUserExist } from "@/service/user/service";
import { image } from "@nextui-org/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();
  const {
    data,
    isLoading: userLoading,
    refetch,
  } = useUserExist(user?.sub as string);

  const handleUser = async () => {
    if (!isLoading && user) {
      // Refetch user data y validar si existe
      refetch().then(async (e) => {
        if (e.data === null) {
          return await createUser({
            auth0Id: user.sub,
            username: user.nickname,
            email: user.email,
            name: user.name,
            image: user.picture,
          });
        }
        return;
      });
    }
  };

  useEffect(() => {
    if (!isLoading && user) {
      handleUser();
    }
  }, [isLoading, user]);
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
}
