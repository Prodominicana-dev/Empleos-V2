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
  useDisclosure,
} from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { EyeIcon } from "@/components/icons/eye-icon";
import { DeleteIcon } from "@/components/icons/delete";
import Experience from "@/components/icons/experience";
import EditExperienceDialog from "./edit";

const statusColorMap: Record<string, ChipProps["color"]> = {
  complete: "success",
  incomplete: "warning",
};

export default function ExperienceCard({
  experience,
  update,
}: {
  experience: any;
  update: () => void;
}) {
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

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
          <span
            onClick={onEditOpen}
            className="text-lg cursor-pointer text-default-400 active:opacity-50"
          >
            <EditIcon />
          </span>
        </Tooltip>
        <EditExperienceDialog
          experience={experience}
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          update={update}
          key={"update-experience"}
        />
        <Tooltip color="danger" content="Eliminar">
          <span className="text-lg cursor-pointer text-danger active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
