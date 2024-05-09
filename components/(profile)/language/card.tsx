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

export default function LanguageCard({ language }: { language: any }) {
  return (
    <div className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3">
      <div className="flex items-center justify-center w-full">
        {language.name}
      </div>
      <div className="flex items-center justify-center w-full">
        {language.level}
      </div>
      <div className="relative flex items-center justify-center gap-2">
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
      </div>
    </div>
  );
}
