"use client";
import React from "react";
import { HoverEffect } from "../card-hover/card-hover";

export default function Categories() {
  const projects = [
    {
      title: "Recursos Humanos",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "https://stripe.com",
    },
    {
      title: "Marketing",
      description:
        "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
      link: "https://netflix.com",
    },
    {
      title: "Innovación",
      description:
        "A multinational technology company that specializes in Internet-related services and products.",
      link: "https://google.com",
    },
    {
      title: "TI",
      description:
        "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
      link: "https://meta.com",
    },
    {
      title: "Categoría 5",
      description:
        "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
      link: "https://amazon.com",
    },
    {
      title: "Categoría 6",
      description:
        "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
      link: "https://microsoft.com",
    },
  ];
  return (
    <div id="categories" className="flex flex-col w-full">
      <h1 className="py-1 text-3xl font-bold text-transparent lg:text-6xl bg-clip-text bg-gradient-to-t from-blue-600 to-sky-500">
        Categorías
      </h1>
      <div>
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
