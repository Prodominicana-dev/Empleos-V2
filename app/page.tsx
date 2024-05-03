"use client";
import Categories from "@/components/(home)/categories";
import Home from "@/components/(home)/homepage";

export default function Page() {
  return (
    <section className="flex flex-col w-full gap-24">
      <Home />
      <Categories />
    </section>
  );
}
