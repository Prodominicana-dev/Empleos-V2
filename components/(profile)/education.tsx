"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  Input,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import EducationCard from "./education/card";
import EducationDialog from "./education/dialog";
import { useDegree } from "@/service/education/service";

export default function EducationData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const [education, setEducation] = useState<any>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data, isLoading } = useDegree();
  const [degrees, setDegrees] = useState<any>([]);

  useEffect(() => {
    if (!isLoading && data) {
      setDegrees(
        data.map((degree: any) => ({ label: degree.name, value: degree.id }))
      );
    }
  }, [data, isLoading]);

  useEffect(() => {
    console.log(user);
    setEducation(user.education);
  }, [user]);

  return (
    <div className="flex flex-col gap-5">
      <Card className="w-full p-2">
        <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
          <div>
            <p className="font-bold text-large">Educación</p>
            <p className="text-small">
              Registra todos tus cursos, certificados, etc.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Input
              placeholder="Buscar..."
              startContent={
                <Icon
                  icon="solar:minimalistic-magnifer-outline"
                  className="text-xl"
                />
              }
            />
            <Tooltip content="Agregar">
              <span
                onClick={onOpen}
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
              >
                <Icon
                  icon="solar:add-circle-bold"
                  className="text-5xl text-blue-500 bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500"
                />
              </span>
            </Tooltip>
            <EducationDialog
              key={user.id}
              id={user.id}
              degrees={degrees}
              update={update}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
            />
          </div>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {education.map((education: any) => (
          <EducationCard
            education={education}
            key={education.id}
            update={update}
          />
        ))}
      </div>
    </div>
  );
}
