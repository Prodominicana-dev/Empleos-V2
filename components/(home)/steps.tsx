"use client";

import Image from "next/image";

export default function Steps() {
  return (
    <div className="flex justify-center w-full bg-red-600 py-28">
      <div className="flex flex-col items-center justify-center h-full gap-28 max-w-7xl">
        <h1 className="text-3xl font-bold text-white lg:text-6xl">
          ¡ÚNETE A NOSOTROS!
        </h1>
        <div className="flex flex-row w-full gap-5 lg:flex-col">
          <div className="grid w-1/2 grid-cols-1 lg:w-full lg:grid-cols-5">
            <Image
              src={"/steps/step1.svg"}
              alt="step-1"
              width={300}
              height={300}
              className="size-full"
            />

            <div className="flex items-center justify-center w-full h-full">
              <div className="w-2 h-24 bg-white lg:w-full lg:h-2 "></div>
            </div>

            <Image
              src={"/steps/step2.svg"}
              alt="step-2"
              width={300}
              height={300}
              className="size-full"
            />

            <div className="flex items-center justify-center w-full h-full">
              <div className="w-2 h-24 bg-white lg:w-full lg:h-2 "></div>
            </div>
            <Image
              src={"/steps/step3.svg"}
              alt="step-3"
              width={300}
              height={300}
              className="size-full"
            />
          </div>
          <div className="grid w-1/2 grid-cols-1 mt-5 lg:w-full lg:grid-cols-5 place-items-center">
            <h1 className="text-xl font-bold text-center lg:text-3xl">
              Buscar trabajo
            </h1>
            <div></div>
            <h1 className="text-xl font-bold text-center lg:text-3xl">
              Encuentra tu vacante
            </h1>
            <div></div>
            <h1 className="text-xl font-bold text-center lg:text-3xl">
              Enviar curriculum
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
