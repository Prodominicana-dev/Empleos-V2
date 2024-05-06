"use client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full gap-16">
      <div className="flex flex-col items-center justify-center w-full gap-5">
        {/* Título */}
        <div className="flex flex-col items-center justify-center w-full">
          <h1 className="font-bold text-black lg:text-6xl">
            Encuentra{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-600 to-sky-500">
              Oportunidades
            </span>
            ,
          </h1>
          <h1 className="font-bold text-black lg:text-6xl">
            Desarrolla tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-600 to-sky-500">
              Potencial
            </span>
          </h1>
          <h1 className="font-bold text-black lg:text-6xl">
            en{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-blue-600 to-sky-500">
              ProDominicana
            </span>
          </h1>
        </div>
        <p className="text-sm text-black lg:text-lg">
          Descubre nuevas oportunidades laborales
        </p>
        <div className="flex items-center justify-center w-full gap-5">
          <Button
            variant={"flat"}
            size="lg"
            as={Link}
            href="#categories"
            radius="md"
            className="bg-gradient-to-tr from-blue-600 to-sky-500"
          >
            Categorías
          </Button>
          <Button
            variant={"bordered"}
            size="lg"
            radius="md"
            className="font-bold text-transparent duration-300 bg-white border-blue-300 group hover:bg-gradient-to-t hover:from-blue-600 hover:to-sky-500 hover:border-sky-500"
          >
            <span className="duration-300 bg-clip-text group-hover:text-white bg-gradient-to-t from-blue-600 to-sky-500">
              Crea tu CV
            </span>
          </Button>
        </div>
      </div>
      <div className="max-w-7xl min-h-[20rem] bg-gradient-to-tr from-blue-600 to-sky-500 rounded-xl px-14 py-4 flex flex-col items-center lg:flex-row gap-5">
        <div className="flex flex-col justify-center w-full text-4xl lg:w-6/12">
          <h1 className="font-bold text-white ">
            {'"'}El secreto de salir adelante
          </h1>
          <h1 className="font-bold text-left text-white">es comenzar.{'"'}</h1>
          <p className="text-base font-semibold text-white">{"-"} Mark Twain</p>
        </div>
        <div className="flex justify-center w-full lg:w-6/12">
          {/* <MeetingSVG size={300} /> */}
          <Image
            src={"/svg/meeting.svg"}
            alt="icon"
            width={3000}
            height={2000}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
