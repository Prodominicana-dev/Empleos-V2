"use client";
import React, { use, useEffect } from "react";
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
import Education from "@/components/icons/education";
import { EditIcon } from "@/components/icons/edit";
import { EyeIcon } from "@/components/icons/eye-icon";
import { DeleteIcon } from "@/components/icons/delete";
import EditEducationDialog from "./edit";
import Delete from "@/components/actions/delete";
import { deleteEducationAction } from "@/actions/education/actions";

const statusColorMap: Record<string, ChipProps["color"]> = {
  complete: "success",
  incomplete: "warning",
};

interface Education {
  id: string;
  title?: string;
  institution: string;
  degreeId: string;
  degrees: { name: string; id: string };
  careerId: string;
  careers: { name: string; id: string };
  startDate: string;
  endDate?: string;
}

export default function EducationCard({
  education,
  update,
}: {
  education: Education;
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

  const deleteEducationWithArgs = deleteEducationAction.bind(
    null,
    education.id,
    onDeleteOpenChange,
    update
  );

  return (
    <Card className="w-full max-w-3xl p-2">
      <CardHeader className="flex justify-center px-4 pt-4 pb-5 text-black md:justify-start">
        <Education size={100} color="fill-gray-600/80" />
      </CardHeader>
      <CardBody className="flex flex-col items-center gap-2 md:flex-row md:justify-between">
        <div>
          <h1 className="font-bold text-large">
            {education.title === null || education.title === ""
              ? education.careerId !== null
                ? education.careers.name
                : education.institution
              : education.title}
          </h1>
          {education.careerId !== null &&
            (education.title === null || education.title === "") && (
              <p className="text-small">{education.institution}</p>
            )}

          <p className="text-small">{education.degrees.name}</p>
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
          <span
            onClick={onEditOpen}
            className="text-lg cursor-pointer text-default-400 active:opacity-50"
          >
            <EditIcon />
          </span>
        </Tooltip>
        <EditEducationDialog
          education={education}
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          update={update}
        />
        <Tooltip color="danger" content="Eliminar">
          <span
            onClick={onDeleteOpen}
            className="text-lg cursor-pointer text-danger active:opacity-50"
          >
            <DeleteIcon />
          </span>
        </Tooltip>
        <Delete
          id={education.id}
          deleteAction={deleteEducationWithArgs}
          name={education.title}
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteOpenChange}
        />
      </CardFooter>
    </Card>
  );
}
