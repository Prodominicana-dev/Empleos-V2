"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Chip,
  Tooltip,
  ChipProps,
  CardFooter,
  Button,
} from "@nextui-org/react";
import Education from "@/components/icons/education";
import { EditIcon } from "@/components/icons/edit";
import { EyeIcon } from "@/components/icons/eye-icon";
import { DeleteIcon } from "@/components/icons/delete";

const statusColorMap: Record<string, ChipProps["color"]> = {
  complete: "success",
  incomplete: "warning",
};

export default function EducationCard({
  education,
}: {
  education: {
    id: string;
    title?: string;
    institution: string;
    degree: string;
    startDate: string;
    endDate?: string;
  };
}) {
  // Convertir las fechas a un formato legible (1 Sept. 2019)
  const status = education.endDate ? "complete" : "incomplete";
  const startDate = new Date(education.startDate);
  const endDate = new Date(education.endDate || new Date().toISOString());
  const startDateString = startDate.toLocaleDateString("es-ES", {
    month: "short",
    year: "numeric",
  });
  const endDateString = endDate.toLocaleDateString("es-ES", {
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="w-full max-w-3xl p-2">
      <CardHeader className="flex justify-center px-4 pt-4 pb-5 text-black md:justify-start">
        <Education size={100} color="fill-gray-600/80" />
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <h1 className="font-bold text-large">{education.title}</h1>
          <p className="text-small">{education.institution}</p>
          <p className="text-small">{education.degree}</p>
          <p className="capitalize text-small">
            {startDateString} - {education.endDate ? endDateString : "presente"}
          </p>
        </div>
        <div>
          <Chip color={statusColorMap[status]} variant="flat">
            {status === "complete" ? "Completado" : "En progreso"}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-4 mt-1">
        <Tooltip content="Editar">
          <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
            <EditIcon />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Eliminar">
          <span className="text-lg cursor-pointer text-danger active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
