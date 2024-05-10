"use client";
import React from "react";
import { Chip, ChipProps, Tooltip, useDisclosure } from "@nextui-org/react";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import { LanguageLevels, Languages } from "@/data/data";
import { deleteLanguageAction } from "@/actions/language/action";
import Delete from "@/components/actions/delete";
import { deletePersonalReferenceAction } from "@/actions/personalReference/action";
import { deleteProfessionalReferenceAction } from "@/actions/professionalReference/action";
import EditRelationshipDialog from "./edit";
import { deleteRelationshipAction } from "@/actions/relationship/action";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Si: "success",
  No: "danger",
};

export default function RelationshipCard({
  relation,
  update,
}: {
  relation: any;
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

  const deleteRelationshipActionWithArgs = deleteRelationshipAction.bind(
    null,
    relation.id,
    onDeleteOpenChange,
    update
  );

  return (
    <div className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3 lg:grid-cols-5">
      <div className="flex items-center justify-center w-full">
        {relation.name}
      </div>
      <div className="flex items-center justify-center w-full capitalize">
        {relation.relationship}
      </div>
      <div className="flex items-center justify-center w-full">
        {relation.phone}
      </div>
      <div className="flex items-center justify-center w-full">
        <Chip
          size="md"
          variant="flat"
          color={statusColorMap[relation.isInTheCompany ? "Si" : "No"]}
        >
          {relation.isInTheCompany ? "Sí" : "No"}
        </Chip>
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
        <EditRelationshipDialog
          isOpen={isEditOpen}
          onOpenChange={onEditOpenChange}
          relation={relation}
          update={update}
          key={relation.id}
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
          id={relation.id}
          name={relation.name}
          isOpen={isDeleteOpen}
          onOpenChange={onDeleteOpenChange}
          deleteAction={deleteRelationshipActionWithArgs}
          key={"delete-relationship"}
        />
      </div>
    </div>
  );
}
