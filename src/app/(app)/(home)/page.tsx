"use client";
import Categories from "@/components/(home)/categories";
import Hero from "@/components/(home)/hero";
import Steps from "@/components/(home)/steps";

export default function Page() {
  return (
    <section className="flex flex-col w-full">
      <Hero />
      <Categories />
      <Steps />
    </section>
  );
}
