"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Chip,
  Tooltip,
  ChipProps,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import countries from "./countries";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";

import { EyeIcon } from "@/components/icons/eye-icon";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import test from "node:test";
import Education from "../icons/education";
import EducationCard from "./education/card";
import EducationDialog from "./education/dialog";
import { useEducation } from "@/service/education/service";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Si: "success",
  No: "danger",
};

export default function EducationData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const [education, setEducation] = useState<any>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
