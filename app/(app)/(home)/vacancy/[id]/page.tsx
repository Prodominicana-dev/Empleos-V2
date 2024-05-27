"use client";
import { useVacancyById } from "@/service/vacancy/service";
import { Button } from "@nextui-org/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { LanguageLevels, Languages } from "@/data/data";
import { Breadcrumbs, BreadcrumbItem, Spinner } from "@nextui-org/react";
import { useUser as AuthUser } from "@auth0/nextjs-auth0/client";
import { useUser as useUserData } from "@/service/user/service";

const ApplyButton = ({ apply }: { apply: () => void }) => {
  return (
    <Button
      onClick={apply}
      variant="faded"
      className="px-16 py-5 text-lg text-white bg-blue-950 font-dm-sans"
    >
      Aplicar
    </Button>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const { user, isLoading: userLoading } = AuthUser();
  const [userData, setUserData] = React.useState<any>({});
  const { data, isLoading } = useVacancyById(params.id);
  const [experience, setExperience] = React.useState<number>(0);
  const [age, setAge] = React.useState<number>(0);
  const [minimumDegree, setMinimumDegree] = React.useState<boolean>(false);
  const [minimumDegreeName, setMinimumDegreeName] = React.useState<string>("");
  const [province, setProvince] = React.useState<string>("");
  const [career, setCareer] = React.useState<string>("");
  const [languages, setLanguages] = React.useState<boolean>(false);
  const [vacancy, setVacancy] = React.useState<any>({});

  const {
    data: userAPI,
    isLoading: userLoadingAPI,
    refetch,
  } = useUserData(user?.sub as string);

  console.log(userAPI);

  useEffect(() => {
    if (!userLoadingAPI && userAPI) {
      console.log(userAPI);
      setUserData(userAPI);
    }
  }, [userAPI, userLoadingAPI]);

  useEffect(() => {
    if (!isLoading && data) {
      refetch().then(() => {
        setVacancy(data);
        console.log(data);
      });
    }
  }, [user, userLoading]);

  useEffect(() => {
    if (!isLoading && data) {
      setVacancy(data);
      console.log(data);
    }
  }, [data, isLoading]);

  const gradientYes = "bg-gradient-to-br from-green-500 to-lime-400";
  const gradientNo = "bg-gradient-to-br from-red-500 to-red-400";

  const breadcrumbsItems = [
    { href: "/", label: "Inicio" },
    { href: "/vacancy", label: "Vacantes" },
    { label: vacancy.title },
  ];

  if (isLoading)
    return (
      <div className="min-h-[85vh] flex justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex justify-center w-full bg-blue-950 min-h-10">
        <div className="flex flex-col w-full max-w-5xl gap-2 px-10 py-6 lg:px-4">
          <Breadcrumbs>
            {breadcrumbsItems.map((item, index) => (
              <BreadcrumbItem
                classNames={{
                  item: "text-white font-dm-sans text-xs",
                  separator: "text-white font-dm-sans text-xs",
                }}
                href={item?.href}
                key={index}
              >
                {item?.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-6xl font-bold text-white font-dm-sans">
              {vacancy.title}
            </h1>
            <ApplyButton apply={() => {}} />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-5xl gap-10 px-10 py-10 lg:px-5">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-black font-dm-sans">
            Descripción de la vacante
          </h1>
          <div
            dangerouslySetInnerHTML={{ __html: vacancy.description }}
            className="flex flex-col gap-2 text-lg text-gray-800 break-words font-dm-sans text-pretty"
          ></div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-semibold text-black font-dm-sans">
            Requisitos obligatorios
          </h1>
          <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
            <div
              className={`flex items-center justify-center w-full p-[3px] rounded-xl ${
                vacancy.hasLicense ? gradientYes : gradientNo
              }`}
            >
              <div className="flex flex-col items-center justify-center w-full h-full gap-3 px-3 py-2 duration-300 bg-white rounded-[8px] lg:flex-row">
                <h3 className="text-lg font-bold text-black font-dm-sans text-balance">
                  ¿Necesitas tener licencia de conducir?
                </h3>
                <div
                  className={`flex items-center justify-center duration-300 rounded-full size-16 ${
                    vacancy.hasLicense ? gradientYes : gradientNo
                  }`}
                >
                  {vacancy.hasLicense ? (
                    <CheckIcon className="text-white size-10" />
                  ) : (
                    <XMarkIcon className="text-white size-10" />
                  )}
                </div>
              </div>
            </div>
            <div
              className={`flex items-center justify-center w-full p-[3px] rounded-xl ${
                vacancy.hasVehicule ? gradientYes : gradientNo
              }`}
            >
              <div className="flex flex-col items-center justify-center w-full h-full gap-3 px-3 py-2 duration-300 bg-white rounded-[8px] lg:flex-row">
                <h3 className="text-lg font-bold text-black font-dm-sans text-balance">
                  ¿Necesitas tener vehiculo?
                </h3>
                <div
                  className={`flex items-center justify-center duration-300 rounded-full size-16 ${
                    vacancy.hasVehicule ? gradientYes : gradientNo
                  }`}
                >
                  {vacancy.hasVehicule ? (
                    <CheckIcon className="text-white size-10" />
                  ) : (
                    <XMarkIcon className="text-white size-10" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <label className="text-lg text-black font-dm-sans">
            <span className="font-bold">Edad mínima requerida:</span>{" "}
            {vacancy.age === null ? "ninguna" : vacancy.age}.
          </label>
          <label className="text-lg text-black font-dm-sans">
            <span className="font-bold">
              Experiencia laboral mínima requerida {"("}en años{")"}:
            </span>{" "}
            {vacancy.experience === null
              ? "ninguna"
              : `${vacancy.experience} años`}
            .
          </label>
          <label className="text-lg text-black font-dm-sans">
            <span className="font-bold">Provincia requerida:</span>{" "}
            {vacancy.province === null ? "cualquiera" : `${vacancy.province}`}.
          </label>
          <label className="text-lg text-black font-dm-sans">
            <span className="font-bold">Nivel académico mínimo requerido:</span>{" "}
            {vacancy.degree?.name === null ? "ninguna" : vacancy.degree?.name}.
          </label>
          {vacancy.degree?.name === "Universitario" &&
            vacancy.career !== null && (
              <label className="text-lg text-black font-dm-sans">
                <span className="font-bold">Licenciatura requerida:</span>{" "}
                {vacancy.career?.name === null
                  ? "ninguna"
                  : vacancy.career?.name}
                .
              </label>
            )}

          <div className="flex flex-col gap-1">
            <label className="text-lg text-black font-dm-sans">
              <span className="font-bold">Idiomas requeridos:</span>
            </label>
            <div className="flex flex-row flex-wrap w-full gap-5">
              {vacancy.language?.map((language: any, index: number) => (
                <div className="flex flex-row">
                  <div
                    key={language.language}
                    className="flex items-center justify-center px-4 py-2 text-white bg-blue-950 rounded-l-xl"
                  >
                    {Languages.map((lang) => {
                      return lang.value === language.language
                        ? lang.label
                        : null;
                    })}
                  </div>
                  <div
                    key={language.level + index}
                    className="flex items-center justify-center px-4 py-2 text-black bg-gray-100 rounded-r-xl"
                  >
                    {LanguageLevels.map((lang) => {
                      return lang.value === language.level ? lang.label : null;
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <ApplyButton apply={() => {}} />
        </div>
      </div>
    </div>
  );
}
