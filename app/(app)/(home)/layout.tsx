"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { createUser, useUserExist } from "@/service/user/service";
import { image } from "@nextui-org/react";
import Footer from "@/components/footer/footer";

interface UserResponse {
  data: any;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useUser();

  const handleUser = async () => {
    if (!isLoading && user) {
      const userExists = (await useUserExist(
        user.sub as string
      )) as UserResponse;
      if (userExists.data !== null) {
        return console.log("existe el usuario");
      }
      return await createUser({
        auth0Id: user.sub,
        username: user.nickname,
        email: user.email,
        name: user.name,
        image: user.picture,
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
      <Footer />
    </div>
  );
}
