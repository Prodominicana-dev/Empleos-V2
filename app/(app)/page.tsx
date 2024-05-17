"use client";
import Categories from "@/components/(home)/categories";
import Home from "@/components/(home)/homepage";
import { HoverEffect } from "@/components/card-hover/card-hover";
import SocialMedia from "@/components/footer/social-media";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    icon: "/icons/consultoriajuridica.svg",
    title: "Consultoría Jurídica",
    description: "10 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/ejecutiva.svg",
    title: "Dirección Ejecutiva",
    description: "5 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/financiera.svg",
    title: "Dirección Administrativa y Financiera",
    description: "20 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/exportacion.svg",
    title: "Dirección de Exportación",
    description: "15 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/innovacion.svg",
    title: "Dirección de Relaciones Internacionales",
    description: "10 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/inteligenciademercados.svg",
    title: "Dirección de Inteligencia de Mercados",
    description: "15 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/inversion.svg",
    title: "Dirección de Marketing y Comunicación",
    description: "10 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/marketing.svg",
    title: "Dirección de Innovación Estratégica",
    description: "5 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/relacionesinternacionales.svg",
    title: "Sistemas",
    description: "20 vacantes disponibles.",
    link: "https://stripe.com",
  },
  {
    icon: "/icons/talentohumano.svg",
    title: "Ventas",
    description: "15 vacantes disponibles.",
    link: "https://stripe.com",
  },
];

const socialMedia = [
  {
    name: "facebook",
    url: "https://www.facebook.com/Prodominicana",
    src: "https://prodominicana.gob.do/svg/social/footer/facebook.svg",
  },
  {
    name: "x",
    url: "https://x.com/prodominicana",
    src: "https://prodominicana.gob.do/svg/social/footer/x.svg",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/prodominicana",
    src: "https://prodominicana.gob.do/svg/social/footer/instagram.svg",
  },
  {
    name: "youtube",
    url: "https://www.youtube.com/@ProDominicana",
    src: "https://prodominicana.gob.do/svg/social/footer/youtube.svg",
  },
];

// Actual year
const year = new Date().getFullYear();

export default function Page() {
  return (
    <section className="flex flex-col w-full">
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
      <div className="relative flex flex-col items-center justify-center w-full gap-8 text-black min-h-[60vh] bg-white mt-24">
        <div className="text-4xl font-bold text-center lg:text-6xl">
          <h1>¡Todas nuestras ofertas!</h1>
        </div>
        <div className="w-10/12">
          <HoverEffect items={projects} />
        </div>
        <div className="absolute bottom-0 w-full h-[25vh] self-end bg-red-600"></div>
      </div>
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
      <div className="w-full bg-blue-950 h-[40vh] flex justify-center">
        <div className="flex flex-col gap-10 max-w-7xl lg:flex-row">
          <div className="flex items-center justify-center w-6/12 ">
            <Image
              src={"/svg/talento-humano-logo.svg"}
              alt="talentohumano"
              width={1000}
              height={1000}
              className="size-6/12"
            />
          </div>
          <div className="grid w-6/12 grid-cols-3 place-content-center">
            <div className="flex flex-col w-full gap-2 text-white">
              <h1 className="text-2xl font-bold h-2/6">Sitios</h1>
              <div className="flex flex-col gap-2 h-4/6">
                <Link
                  href={"#directions"}
                  className="duration-300 hover:text-white/80"
                >
                  Direcciones
                </Link>
                <Link href={"/vacancy"}>Vacantes</Link>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2 text-white">
              <h1 className="text-2xl font-bold h-2/6">Búscanos</h1>
              <div className="flex flex-col gap-2 h-4/6">
                <p className="text-pretty">
                  Av. 27 de Febrero esq. Av. Gregorio Luperón, Plaza de la
                  Bandera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full py-5 bg-white">
        <div className="flex items-center w-11/12 h-2/6 text-blue-950">
          <div className="flex items-center justify-start w-8/12 h-full space-x-2">
            <p className="text-center sm:text-left">
              {" "}
              © {year} Todos los derechos reservados. Desarrollado por
            </p>
            <Image
              alt="prodomsvg"
              src={"https://prodominicana.gob.do/prodominicana.svg"}
              width={150}
              height={150}
              className="w-20"
            />
          </div>
          <div className="flex items-center justify-center w-4/12 h-full space-x-4 sm:justify-end">
            <h1 className=" sm:h-[25px] font-bold text-lg flex">SÍGUENOS</h1>
            {socialMedia.map(({ name, url, src }, index) => (
              <SocialMedia url={url} image={src} alt={name} key={index} />
            ))}
          </div>
        </div>
      </div>
      {/* <Home />
      <Categories /> */}
    </section>
  );
}
