"use client";
import React from "react";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { LanguageLevels, Languages } from "@/data/data";
import { deleteLanguageAction } from "@/actions/language/action";
import Delete from "@/components/actions/delete";
import { deletePersonalReferenceAction } from "@/actions/personalReference/action";
import { deleteProfessionalReferenceAction } from "@/actions/professionalReference/action";

export default function ProfessionalReferenceCard({
  professionalReference,
  update,
}: {
  professionalReference: any;
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

  const deleteProfessionalReferenceWithArgs =
    deleteProfessionalReferenceAction.bind(
      null,
      professionalReference.id,
      onDeleteOpenChange,
      update
    );

  return (
    <div className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3 lg:grid-cols-5">
      <div className="flex items-center justify-center w-full">
        {professionalReference.name}
      </div>
      <div className="flex items-center justify-center w-full">
        {professionalReference.company}
      </div>
      <div className="flex items-center justify-center w-full">
        {professionalReference.position}
      </div>
      <div className="flex items-center justify-center w-full">
        {professionalReference.phone}
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
