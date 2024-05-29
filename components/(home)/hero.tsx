"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  const handleCVButton = () => {
    const userId = localStorage.getItem("userId");
    const user = localStorage.getItem("user");
    const userObject = JSON.parse(user as string);
    if (userId && user) {
      return router.push(`/profile/${userObject.auth0Id}`);
    } else {
      return router.push("/api/auth/login");
    }
  };
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-[60vh]">
        <div className="absolute inset-0 z-10 bg-blue-950/90"></div>
        <div className="z-0 w-full h-full overflow-hidden">
          <Image
            src={"/jpg/hero.jpg"}
            alt="hero-image"
            width={1000}
            height={1000}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full h-full gap-5 lg:flex-row">
          <div className="flex flex-col w-full gap-5 lg:w-6/12">
            <div className="text-3xl font-bold text-center md:text-5xl">
              <h1>Encuentra Oportunidades,</h1>
              <h1>Desarrolla tu Potencial</h1>
              <h1>en ProDominicana</h1>
            </div>
            <p className="text-center">
              Descubre nuevas oportunidades laborales
            </p>
            <div className="flex flex-col items-center justify-center w-full gap-5 md:flex-row">
              <Button
                variant={"flat"}
                size="lg"
                as={Link}
                href="#categories"
                radius="md"
                className="font-bold text-white bg-gradient-to-tr from-blue-600 to-sky-500"
              >
                Categorías
              </Button>
              <Button
                variant={"bordered"}
                size="lg"
                radius="md"
                onClick={handleCVButton}
                className="font-bold text-white duration-300 bg-transparent border-blue-300 group hover:bg-gradient-to-t hover:from-blue-600 hover:to-sky-500 hover:border-sky-500"
              >
                <span className="text-white">Crea tu CV</span>
              </Button>
            </div>
          </div>
          <Image
            src={"/empleate-logo.svg"}
            alt="icon"
            width={1000}
            height={1000}
            className="object-cover w-[32rem] hidden lg:block"
          />
        </div>
      </div>
      <div className="w-full min-h-[20vh] md:h-[20vh] bg-red-600 flex md:flex-row flex-col items-center justify-center gap-5 py-5 md:py-0">
        <div className="flex flex-col justify-center w-full h-full gap-5 md:flex-row md:rounded-br-full md:w-6/12 md:gap-20 lg:gap-44 md:bg-blue-950">
          <div className="flex flex-col items-center justify-center text-2xl text-center md:text-4xl">
            <h2 className="font-bold text-white">+400</h2>
            <p className="text-xl text-white">Empleados</p>
          </div>
          <div className="flex flex-col items-center justify-center text-2xl text-center md:text-4xl">
            <h2 className="font-bold text-white">+100</h2>
            <p className="text-xl text-white">Posiciones</p>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full h-full gap-5 md:flex-row md:w-6/12 md:gap-20 lg:gap-44">
          <div className="flex flex-col items-center justify-center text-2xl text-center md:text-4xl">
            <h2 className="font-bold text-white">+200</h2>
            <p className="text-xl text-white">Pasantías Anuales</p>
          </div>
          <div className="flex flex-col items-center justify-center text-2xl text-center md:text-4xl">
            <h2 className="font-bold text-white">+10</h2>
            <p className="text-xl text-white">Departamentos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
