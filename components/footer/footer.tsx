"use client";
import SocialMedia from "@/components/footer/social-media";
import Image from "next/image";
import Link from "next/link";

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

export default function Footer() {
  return (
    <>
      <div className="w-full bg-blue-950 py-5 lg:h-[40vh] flex justify-center">
        <div className="flex flex-col gap-10 max-w-7xl sm:flex-row">
          <div className="flex items-center justify-center w-full sm:w-6/12 ">
            <Image
              src={"/svg/talento-humano-logo.svg"}
              alt="talentohumano"
              width={1000}
              height={1000}
              className="size-10/12 sm:size-6/12"
            />
          </div>
          <div className="grid w-10/12 grid-cols-2 sm:grid-cols-3 sm:w-6/12 place-content-center place-self-center">
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
      <div className="flex flex-col items-center justify-center w-full py-5 bg-white">
        <div className="flex flex-col items-center w-11/12 lg:flex-row h-2/6 text-blue-950">
          <div className="flex flex-col items-center justify-start w-full h-full space-x-2 lg:flex-row lg:w-8/12">
            <p className="text-center sm:text-left">
              © {year} Todos los derechos reservados. Desarrollado por
            </p>
            <Image
              alt="prodomsvg"
              src={"https://prodominicana.gob.do/prodominicana.svg"}
              width={150}
              height={150}
              className="w-44 lg:w-20"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-4/12 h-full space-x-4 lg:flex-row lg:justify-end">
            <h1 className="flex text-lg font-bold">SÍGUENOS</h1>
            <div className="flex justify-center">
              {socialMedia.map(({ name, url, src }, index) => (
                <SocialMedia url={url} image={src} alt={name} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
