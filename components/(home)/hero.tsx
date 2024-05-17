"use client";

import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
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
          <div className="flex flex-col w-6/12 gap-5">
            <div className="text-5xl font-bold text-center">
              <h1>Encuentra Oportunidades,</h1>
              <h1>Desarrolla tu Potencial</h1>
              <h1>en ProDominicana</h1>
            </div>
            <p className="text-center">
              Descubre nuevas oportunidades laborales
            </p>
            <div className="flex items-center justify-center w-full gap-5">
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
            className="object-cover w-[32rem] "
          />
        </div>
      </div>
      <div className="w-full h-[20vh] bg-red-600 flex">
        <div className="flex flex-row justify-center w-6/12 h-full rounded-br-full gap-44 bg-blue-950">
          <div className="flex flex-col items-center justify-center text-4xl text-center">
            <h2 className="font-bold text-white">+400</h2>
            <p className="text-xl text-white">Empleados</p>
          </div>
          <div className="flex flex-col items-center justify-center text-4xl text-center">
            <h2 className="font-bold text-white">+100</h2>
            <p className="text-xl text-white">Posiciones</p>
          </div>
        </div>
        <div className="flex flex-row justify-center w-6/12 h-full gap-44">
          <div className="flex flex-col items-center justify-center text-4xl text-center">
            <h2 className="font-bold text-white">+200</h2>
            <p className="text-xl text-white">Pasantías Anuales</p>
          </div>
          <div className="flex flex-col items-center justify-center text-4xl text-center">
            <h2 className="font-bold text-white">+10</h2>
            <p className="text-xl text-white">Departamentos</p>
          </div>
        </div>
      </div>
    </div>
  );
}
