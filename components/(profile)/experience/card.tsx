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
import { EditIcon } from "@/components/icons/edit";
import { EyeIcon } from "@/components/icons/eye-icon";
import { DeleteIcon } from "@/components/icons/delete";
import Experience from "@/components/icons/experience";

const statusColorMap: Record<string, ChipProps["color"]> = {
  complete: "success",
  incomplete: "warning",
};

export default function ExperienceCard({ experience }: { experience: any }) {
  // Convertir las fechas a un formato legible (1 Sept. 2019)
  const status = experience.endDate ? "complete" : "incomplete";
  const startDate = new Date(experience.startDate);
  const endDate = new Date(experience.endDate || new Date().toISOString());
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
        <Experience size={100} color="fill-gray-600/80" />
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <h1 className="font-bold text-large">{experience.position}</h1>
          <p className="text-small">{experience.company}</p>
          <p className="text-small">{experience.area}</p>
          <p className="capitalize text-small">
            {startDateString} -{" "}
            {experience.endDate ? endDateString : "presente"}
          </p>
        </div>
        <div>
          <Chip color={statusColorMap[status]} variant="flat">
            {status === "complete" ? "Completado" : "Trabajando"}
          </Chip>
        </div>
      </CardBody>
      <CardFooter className="flex justify-end gap-4 mt-1">
        <Tooltip content="Detalles">
          <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
            <EyeIcon />
          </span>
        </Tooltip>
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
