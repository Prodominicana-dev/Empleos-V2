"use client";
import { useUser } from "@/service/user/service";
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import UserData from "@/components/(profile)/user-profile";
import UserDataSkeleton from "@/components/(profile)/skeleton/user-profile";
import RelationshipData from "@/components/(profile)/relationship";
import QuestionData from "@/components/(profile)/questions";
import EducationData from "@/components/(profile)/education";
import ExperienceData from "@/components/(profile)/experience";
import LanguageData from "@/components/(profile)/language";
import PersonalRefData from "@/components/(profile)/personal-reference";
import ProfessionalRefData from "@/components/(profile)/professional-reference";
import CVData from "@/components/(profile)/cv";

interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  [key: string]: any;
}

interface Education {
  institution: string;
  degree: string;
  startDate: string;
  [key: string]: any;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  documentNumber: string;
  birthdate: string;
  cv?: Array<{ id: string }>;
  relationship?: Array<{ name: string; phone: string; relationship: string }>;
  education?: Education[];
  workExperience?: WorkExperience[];
  language?: any[];
  personalReference?: any[];
  professionalReference?: any[];
  [key: string]: any;
}

export default function Page({ params: { id } }: any) {
  const { data, isLoading, refetch } = useUser(id);
  const [user, setUser] = useState<any>({});
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [requestedTab, setRequestedTab] = useState<string | null>(null);
  const [validationModal, setValidationModal] = useState({
    isOpen: false,
    message: "",
  });
  console.log("user", user);

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

  const validateCurrentTab = (tab: string): boolean => {
    switch (tab) {
      case "profile":
        return !!(
          user.name &&
          user.email &&
          user.phone &&
          user.documentNumber &&
          user.birthdate
        );

      case "cv":
        return !!(user.cv && user.cv.length > 0);

      case "relationship":
        return !!(
          user.relationship &&
          user.relationship.length > 0 &&
          user.relationship.every(
            (rel: any) => rel.name && rel.phone && rel.relationship
          )
        );
      case "education":
        return (
          Array.isArray(user.education) &&
          user.education.length > 0 &&
          user.education.every(
            (edu: Education) =>
              !!edu.institution?.trim() && !!edu.startDate && !!edu.degreeId
          )
        );

      case "experience":
        return (
          user.workExperience?.length > 0 &&
          user.workExperience.every(
            (exp: WorkExperience) =>
              exp.company && exp.position && exp.startDate
          )
        );

      case "language":
        return !!(user.language && user.language.length > 0);
      case "rper":
        return (
          Array.isArray(user.personalReference) &&
          user.personalReference.length > 0 &&
          user.personalReference.every(
            (ref: any) =>
              !!ref.name?.trim() &&
              !!ref.phone?.trim() &&
              !!ref.relationship?.trim() 
          )
        );

      case "rpro":
        return (
          Array.isArray(user.professionalReference) &&
          user.professionalReference.length > 0 &&
          user.professionalReference.every(
            (ref: any) =>
              !!ref.name?.trim() &&
              !!ref.phone?.trim() &&
              !!ref.company?.trim() &&
              !!ref.position?.trim()
          )
        );

      default:
        return true;
    }
  };

  const getValidationMessage = (tab: string): string => {
    switch (tab) {
      case "profile":
        return "Debe completar: nombre, email, teléfono, número de documento y fecha de nacimiento";
      case "cv":
        return "Debe subir al menos un archivo de CV";
      case "relationship":
        return "Debe agregar al menos un contacto de emergencia con nombre, teléfono y parentesco";
      case "education":
        return "Debe agregar al menos un registro de educación con institución, título y fecha de inicio";
      case "experience":
        return "Debe agregar al menos un registro de experiencia laboral con empresa, puesto y fecha de inicio";
      case "language":
        return "Debe agregar al menos un idioma";
      case "rper":
        return "Debe agregar al menos una referencia personal";
      case "rpro":
        return "Debe agregar al menos una referencia profesional";
      default:
        return "Debe completar todos los campos requeridos";
    }
  };
  const handleTabChange = (nextTab: string) => {
    if (nextTab === activeTab) return;

    if (!validateCurrentTab(activeTab)) {
      setValidationModal({
        isOpen: true,
        message: getValidationMessage(activeTab),
      });
      return; 
    }

    setActiveTab(nextTab);
  };
  useEffect(() => {
    if (requestedTab && validateCurrentTab(activeTab)) {
      setRequestedTab(null);
    }
  }, [user]);
  return (
    <div className="flex justify-center w-full">
      <div className="max-w-7xl w-full min-h-[80vh] text-black flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-black">Configuración</h1>
          <p className="text-sm">Configura el perfíl a tu medida</p>
        </div>
        <Modal
          isOpen={validationModal.isOpen}
          onOpenChange={() =>
            setValidationModal((prev) => ({ ...prev, isOpen: false }))
          }
        >
          <ModalContent>
            <ModalHeader>Datos incompletos</ModalHeader>
            <ModalBody>
              <p>Debe completar al menos un registro para continuar.</p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                onPress={() =>
                  setValidationModal((prev) => ({ ...prev, isOpen: false }))
                }
              >
                Entendido
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <div className="w-full text-black">
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => handleTabChange(key as string)}
            variant={`bordered`}
            aria-label="Tabs variants"
            fullWidth
            isDisabled={isLoading}
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
            <Tab key="cv" title="CV">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <CVData user={user} update={handleRefresh} key={"profile-cv"} />
              )}
            </Tab>
            <Tab key="relationship" title="Parentesco">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <RelationshipData
                  user={user}
                  update={handleRefresh}
                  key={"relationship-data"}
                />
              )}
            </Tab>
            {/* <Tab key="questions" title="Preguntas">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <QuestionData
                  user={user}
                  update={handleRefresh}
                  key={"question-data"}
                />
              )}
            </Tab> */}
            <Tab key="education" title="Educación">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <EducationData
                  user={user}
                  update={handleRefresh}
                  key={"education-data"}
                  onMount={() => {
                    if (!validateCurrentTab("education")) {
                      setValidationModal({
                        isOpen: true,
                        message: getValidationMessage("education"),
                      });
                    }
                  }}
                />
              )}
            </Tab>
            <Tab key="experience" title="Experiencia">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <ExperienceData
                  user={user}
                  update={handleRefresh}
                  key={"experience-data"}
                />
              )}
            </Tab>
            <Tab key="language" title="Idiomas">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <LanguageData
                  user={user}
                  update={handleRefresh}
                  key={"language-data"}
                  onMount={() => {
                    if (!validateCurrentTab("education")) {
                      setValidationModal({
                        isOpen: true,
                        message: getValidationMessage("education"),
                      });
                    }
                  }}
                />
              )}
            </Tab>
            <Tab key="rper" title="Referencia Personal">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <PersonalRefData
                  user={user}
                  update={handleRefresh}
                  key={"rper-data"}
                />
              )}
            </Tab>
            <Tab key="rpro" title="Referencia Profesional">
              {isLoading ? (
                <UserDataSkeleton />
              ) : (
                <ProfessionalRefData
                  user={user}
                  update={handleRefresh}
                  key={"rpro-data"}
                />
              )}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
