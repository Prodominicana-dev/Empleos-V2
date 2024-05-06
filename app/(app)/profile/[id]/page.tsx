"use client";
import { useUser } from "@/service/user/service";
import React, { useEffect } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import UserData from "@/components/(profile)/user-profile";
import UserDataSkeleton from "@/components/(profile)/skeleton/user-profile";

export default function Page({ params: { id } }: any) {
  const { data, isLoading } = useUser(id);
  useEffect(() => {
    console.log(data);
  }, [isLoading, data]);
  return (
    <div className="w-full min-h-[84vh] text-black flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-black">Configuración</h1>
        <p className="text-sm">Configura el perfíl a tu medida</p>
      </div>
      <div className="w-full text-black">
        <Tabs
          key={`bordered`}
          variant={`bordered`}
          aria-label="Tabs variants"
          fullWidth
          classNames={{
            tabList: "gap-6 w-full relative border-2 border-sky-500",
            cursor: "w-full bg-gradient-to-r from-blue-600 to-sky-500 ",
            tabContent:
              "group-data-[selected=true]:text-white group-data-[selected=true]:font-semibold text-black/80",
          }}
        >
          <Tab key="profile" title="Perfíl">
            <UserData id={id} key={"profile-data"} />
          </Tab>
          <Tab key="relationship" title="Parentesco" />
          <Tab key="questions" title="Preguntas" />
          <Tab key="education" title="Educación" />
          <Tab key="experience" title="Experiencia Laboral" />
          <Tab key="language" title="Idiomas" />
          <Tab key="rper" title="Referencia Personal" />
          <Tab key="rpro" title="Referencia Profesional" />
        </Tabs>
      </div>
    </div>
  );
}
