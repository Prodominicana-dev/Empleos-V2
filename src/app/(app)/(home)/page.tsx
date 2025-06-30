"use client";
import Categories from "@/components/(home)/categories";
import Hero from "@/components/(home)/hero";
import Steps from "@/components/(home)/steps";
import WarningModal from "@/components/(home)/warningModal";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Page() {
  const { user } = useUser();

  // console.log("user", user);

  return (
    <section className="flex flex-col w-full">
      {user ? (
        <>
          <WarningModal user={user as any} />
        </>
      ) : (
        <></>
      )}
      <Hero />
      <Categories />
      <Steps />
    </section>
  );
}
