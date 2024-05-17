"use client";
import React from "react";
import { HoverEffect } from "../card-hover/card-hover";

export default function Categories() {
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
  return (
    <div className="relative flex flex-col items-center justify-center w-full gap-8 text-black min-h-[60vh] bg-white mt-24">
      <div className="text-4xl font-bold text-center lg:text-6xl">
        <h1>¡Todas nuestras ofertas!</h1>
      </div>
      <div className="w-10/12">
        <HoverEffect items={projects} />
      </div>
      <div className="absolute bottom-0 w-full h-[25vh] self-end bg-red-600"></div>
    </div>
  );
}
