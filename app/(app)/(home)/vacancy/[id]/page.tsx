"use client";
import { useVacancyById } from "@/service/vacancy/service";
import { Button } from "@nextui-org/button";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { LanguageLevels, Languages } from "@/data/data";
import { Breadcrumbs, BreadcrumbItem, Spinner } from "@nextui-org/react";
import { useUser as AuthUser } from "@auth0/nextjs-auth0/client";
import { useUser as useUserData } from "@/service/user/service";

const ApplyButton = ({
  apply,
  disabled,
}: {
  apply: () => void;
  disabled: boolean;
}) => {
  const disabledColor = "bg-gray-300 text-gray-500 cursor-not-allowed";
  const enabledColor = "bg-blue-950 text-white cursor-pointer";
  return (
    <Button
      onClick={apply}
      disabled={disabled}
      variant="faded"
      className={`px-16 py-5 text-lg font-dm-sans ${
        disabled ? disabledColor : enabledColor
      }`}
    >
      Aplicar
    </Button>
  );
};

export default function Page({ params }: { params: { id: string } }) {
  const { user, isLoading: userLoading } = AuthUser();
  const [userData, setUserData] = React.useState<any>({});
  const { data, isLoading } = useVacancyById(params.id);

  // Parametros a validar
  const [minimunDegreeId, setMinimunDegreeId] = React.useState<string>("");
  const [province, setProvince] = React.useState<string>("");
  const [language, setLanguage] = React.useState<any[]>([]);
  const [licenseRequired, setLicenseRequired] = React.useState<boolean>(false);
  const [vehiculeRequired, setVehiculeRequired] =
    React.useState<boolean>(false);
  const [ageRequired, setAgeRequired] = React.useState<number>(0);
  const [experienceRequired, setExperienceRequired] = React.useState<number>(0);
  const [careerRequiredId, setCareerIdRequired] = React.useState<string>("");

  // Datos del usuario
  const [hasMinimunExperience, setHasMinimunExperience] =
    React.useState<boolean>(false);
  const [hasMinimunDegree, setHasMinimunDegree] =
    React.useState<boolean>(false);
  const [hasProvince, setHasProvince] = React.useState<boolean>(false);
  const [hasLanguages, setHasLanguages] = React.useState<boolean>(false);
  const [hasLicense, setHasLicense] = React.useState<boolean>(false);
  const [hasVehicule, setHasVehicule] = React.useState<boolean>(false);
  const [hasMinimunAge, setHasMinimunAge] = React.useState<boolean>(false);
  const [hasCareer, setHasCareer] = React.useState<boolean>(false);

  const [vacancy, setVacancy] = React.useState<any>({});
  const [validationLoading, setValidationLoading] =
    React.useState<boolean>(true);

  const { data: userAPI, isLoading: userLoadingAPI } = useUserData(
    user?.sub as string
  );

  useEffect(() => {
    if (!isLoading && data) {
      setVacancy(data);
      console.log(data);
      setValidationLoading(true);
      setMinimunDegreeId(data.degreeId);
      setProvince(data?.province);
      setAgeRequired(data.age === null ? 0 : data.age);
      // Extraer la experiencia laboral en formato (1-3) a un número
      const experience = data?.experience.split("-");
      setExperienceRequired(parseInt(experience[1]));
      setLicenseRequired(data?.hasLicense);
      setVehiculeRequired(data?.hasVehicule);
      setCareerIdRequired(data.careerId !== null ? data.careerId : "");
      setLanguage(data?.language);
      setValidationLoading(false);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (!userLoadingAPI && userAPI && !validationLoading) {
      console.log(userAPI);
      setUserData(userAPI);
      // Validar si el usuario cumple con los requisitos de la vacante
      // Validar si el usuario tiene la misma provincia que la vacante, si la vacante es 'cualquiera' se considera que cumple
      setHasProvince(
        province === "cualquiera" || province === userAPI.province
          ? true
          : false
      );

      // Validar si el usuario tiene el nivel académico mínimo requerido
      // Recorremos 'education' para validar si el usuario tiene el nivel académico mínimo requerido
      userAPI.education.map((education: any) => {
        console.log(minimunDegreeId, education.degreeId);
        if (education.degreeId === minimunDegreeId) {
          return setHasMinimunDegree(true);
        }
      });

      // Validar si el usuario tiene la experiencia laboral mínima requerida
      // Recorremos 'experiences' para validar si el usuario tiene la experiencia laboral mínima requerida
      // Calcular el total de años de experiencia en base a las experiencias laborales del usuario
      let totalExperience = 0;
      userAPI.workExperience.map((experience: any) => {
        // Calcular los años de experiencia en base a la fecha de inicio y fin de la experiencia laboral, si la fecha de fin es null, se considera la fecha actual
        const startDate = new Date(experience.startDate);
        const endDate = experience.endDate
          ? new Date(experience.endDate)
          : new Date();
        const difference = Math.abs(endDate.getTime() - startDate.getTime());
        const years = difference / (1000 * 3600 * 24 * 365);
        totalExperience += years;
      });

      // Validar si el usuario tiene la experiencia laboral mínima requerida
      setHasMinimunExperience(
        totalExperience >= experienceRequired ? true : false
      );

      // Validar si el usuario tiene los idiomas requeridos
      // Recorremos 'languages' para validar si el usuario tiene los idiomas requeridos y el nivel requerido
      const hasLanguages = validateLanguages(userAPI.language);
      setHasLanguages(hasLanguages);

      // Validar si el usuario tiene la licencia de conducir requerida
      setHasLicense(licenseRequired ? userAPI.hasLicense : true);

      // Validar si el usuario tiene vehiculo
      setHasVehicule(vehiculeRequired ? userAPI.hasVehicule : true);

      // Validar si el usuario tiene la edad mínima requerida para la vacante, extrayendolo de la fecha de nacimiento
      const birthDate = new Date(userAPI.birthdate);
      const age = new Date().getFullYear() - birthDate.getFullYear();
      setHasMinimunAge(age >= ageRequired ? true : false);

      // Validar si la carrera universitaria requerida es la misma que la del usuario
      setHasCareer(
        careerRequiredId === ""
          ? true
          : userAPI.education.find(
              (education: any) => education.careerId === careerRequiredId
            )
          ? true
          : false
      );
    }
  }, [userAPI, userLoadingAPI, validationLoading]);

  const validateLanguages = (
    userLanguages: { name: string; level: number }[]
  ) => {
    // Revisar en el arreglo de language si el arreglo de idiomas del usuario contiene TODOS los idiomas requeridos y el nivel requerido
    let hasLanguages = true;
    language.map((lang) => {
      if (
        !userLanguages.find(
          (userLang) =>
            userLang.name === lang.language && userLang.level >= lang.level
        )
      ) {
        hasLanguages = false;
      }
    });
    return hasLanguages;
  };

  const validateButtonDisabled = () => {
    console.log(
      hasMinimunDegree,
      hasMinimunExperience,
      hasProvince,
      hasLanguages,
      hasLicense,
      hasVehicule,
      hasCareer
    );
    return !(
      hasMinimunDegree &&
      hasMinimunExperience &&
      hasProvince &&
      hasLanguages &&
      hasLicense &&
      hasVehicule &&
      hasCareer
    );
  };

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
            <ApplyButton apply={() => {}} disabled={validateButtonDisabled()} />
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
                <div key={index} className="flex flex-row">
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
          <ApplyButton
            apply={() => {
              console.log(validateButtonDisabled());
            }}
            disabled={validateButtonDisabled()}
          />
        </div>
      </div>
    </div>
  );
}
