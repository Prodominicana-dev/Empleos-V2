"use client";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "../card-hover/card-hover";
import { useCategories } from "@/service/vacancy/category/service";

export interface Category {
  icon?: string;
  name: string;
  _count: { vacancies: number };
  id: string;
}

export default function Categories() {
  const { data, isLoading } = useCategories();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data && !isLoading) {
      setCategories(data);
    }
  }, [data, isLoading]);

  return (
    <section
      id="categories"
      className="relative flex flex-col items-center justify-center w-full gap-8 text-black min-h-[60vh] bg-white mt-24"
    >
      <div className="px-5 text-4xl font-bold text-center lg:text-6xl">
        <h1>¡Todas nuestras ofertas!</h1>
      </div>
      <div className="w-10/12">
        <HoverEffect items={categories} />
      </div>
      <div className="absolute bottom-0 w-full h-[25vh] self-end bg-red-600"></div>
    </section>
  );
}
