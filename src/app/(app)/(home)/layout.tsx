"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import React, { Suspense, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { createUser, userExist } from "@/service/user/service";
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
      const userLogged = localStorage.getItem("user");
      const userIdLogged = localStorage.getItem("userId");
      if (userLogged && userIdLogged) {
        return;
      } else {
        const userExists = (await userExist(
          user.sub as string
        )) as UserResponse;
        if (userExists.data !== null) {
          console.log(userExists);
          // Si existe crear en localStorage el usuario y almacenar el id
          localStorage.setItem("user", JSON.stringify(userExists.data));
          localStorage.setItem("userId", userExists.data.id);
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
      <Suspense>{children}</Suspense>
      <Footer />
    </div>
  );
}
