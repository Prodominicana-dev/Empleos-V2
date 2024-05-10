"use client";
import React from "react";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { LanguageLevels, Languages } from "@/data/data";
import EditLanguageDialog from "./edit";
import { deleteLanguageAction } from "@/actions/language/action";
import Delete from "@/components/actions/delete";

export default function LanguageCard({
  language,
  update,
}: {
  language: any;
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

  const deleteExperienceWithArgs = deleteLanguageAction.bind(
    null,
    language.id,
    onDeleteOpenChange,
    update
  );

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
          <span
            onClick={onEditOpen}
            className="text-lg cursor-pointer text-default-400 active:opacity-50"
          >
            <EditIcon />
          </span>
        </Tooltip>
        <EditLanguageDialog
          isOpen={isEditOpen}
          language={language}
          onOpenChange={onEditOpenChange}
          update={update}
          key={"update-language"}
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
          deleteAction={deleteExperienceWithArgs}
          id={language.id}
          isOpen={isDeleteOpen}
          name={Languages.find((l) => l.value === language.name)?.label}
          onOpenChange={onDeleteOpenChange}
          key={"delete-language"}
        />
      </div>
    </div>
  );
}
