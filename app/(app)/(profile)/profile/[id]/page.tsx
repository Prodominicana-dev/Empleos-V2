"use client";
import { useUser } from "@/service/user/service";
import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import UserData from "@/components/(profile)/user-profile";
import UserDataSkeleton from "@/components/(profile)/skeleton/user-profile";
import RelationshipData from "@/components/(profile)/relationship";
import QuestionData from "@/components/(profile)/questions";
import EducationData from "@/components/(profile)/education";
import ExperienceData from "@/components/(profile)/experience";
import LanguageData from "@/components/(profile)/language";
import PersonalRefData from "@/components/(profile)/personal-reference";
import ProfessionalRefData from "@/components/(profile)/professional-reference";

export default function Page({ params: { id } }: any) {
  const { data, isLoading, refetch } = useUser(id);
  const [user, setUser] = useState<any>({});
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (!isLoading && data) setUser(data);
  }, [isLoading, data]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    if (refresh) {
      refetch().then((e) => {
        if (e.data) setUser(e.data);
      });
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <div className="flex justify-center w-full">
      <div className="max-w-7xl w-full min-h-[80vh] text-black flex flex-col gap-5">
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
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <UserData
                  user={user}
                  update={handleRefresh}
                  key={"profile-data"}
                />
              )}
            </Tab>
            <Tab key="relationship" title="Parentesco">
              <RelationshipData
                user={user}
                update={handleRefresh}
                key={"relationship-data"}
              />
            </Tab>
            <Tab key="questions" title="Preguntas">
              <QuestionData id={id} key={"question-data"} />
            </Tab>
            <Tab key="education" title="Educación">
              <EducationData
                user={user}
                update={handleRefresh}
                key={"education-data"}
              />
            </Tab>
            <Tab key="experience" title="Experiencia">
              <ExperienceData
                user={user}
                update={handleRefresh}
                key={"experience-data"}
              />
            </Tab>
            <Tab key="language" title="Idiomas">
              <LanguageData
                user={user}
                update={handleRefresh}
                key={"language-data"}
              />
            </Tab>
            <Tab key="rper" title="Referencia Personal">
              <PersonalRefData
                user={user}
                update={handleRefresh}
                key={"rper-data"}
              />
            </Tab>
            <Tab key="rpro" title="Referencia Profesional">
              <ProfessionalRefData
                user={user}
                update={handleRefresh}
                key={"rpro-data"}
              />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
