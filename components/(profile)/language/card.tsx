"use client";
import React from "react";
import { Tooltip } from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { LanguageLevels, Languages } from "@/data/data";

export default function LanguageCard({ language }: { language: any }) {
  return (
    <div className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3">
      <div className="flex items-center justify-center w-full">
        {Languages.find((l) => l.value === language.name)?.label}
      </div>
      <div className="flex items-center justify-center w-full">
        {LanguageLevels.find((l) => l.value === language.level)?.label}
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
