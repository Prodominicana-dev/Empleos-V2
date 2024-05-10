"use client";
import React from "react";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { LanguageLevels, Languages } from "@/data/data";
import { deleteLanguageAction } from "@/actions/language/action";
import Delete from "@/components/actions/delete";
import EditPersonalReferenceDialog from "./edit";
import { deletePersonalReferenceAction } from "@/actions/personalReference/action";

export default function PersonalReferenceCard({
  personalReference,
  update,
}: {
  personalReference: any;
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

  const deletePersonalReferenceWithArgs = deletePersonalReferenceAction.bind(
    null,
    personalReference.id,
    onDeleteOpenChange,
    update
  );

  return (
    <div className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3 lg:grid-cols-4">
      <div className="flex items-center justify-center w-full">
        {personalReference.name}
      </div>
      <div className="flex items-center justify-center w-full">
        {personalReference.relationship}
      </div>
      <div className="flex items-center justify-center w-full">
        {personalReference.phone}
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
        <EditPersonalReferenceDialog
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          person={personalReference}
          update={update}
          key={"update-personalReference"}
        />
        <Tooltip color="danger" content="Eliminar">
          <span className="text-lg cursor-pointer text-danger active:opacity-50">
            <DeleteIcon />
          </span>
        </Tooltip>
      </div>
    </div>
  );
}
