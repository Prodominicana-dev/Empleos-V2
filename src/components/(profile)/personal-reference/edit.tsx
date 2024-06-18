"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Autocomplete,
  AutocompleteItem,
  DatePicker,
  DateRangePicker,
  Textarea,
} from "@nextui-org/react";
import { createEducationAction } from "@/actions/education/actions";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useFormStatus } from "react-dom";
import { createExperienceAction } from "@/actions/experience/action";
import {
  createPersonalReferenceAction,
  updatePersonalReferenceAction,
} from "@/actions/personalReference/action";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function EditPersonalReferenceDialog({
  person,
  update,
  isOpen,
  onOpenChange,
}: {
  person: any;
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const updatePersonalReferenceWithId = updatePersonalReferenceAction.bind(
    null,
    person.id,
    update,
    onOpenChange
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={updatePersonalReferenceWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Editar esta referencia personal
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona de referencia"
                  name="name"
                  defaultValue={person.name}
                  errorMessage="Por favor, ingrese el nombre de la persona de referencia"
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Relación"
                  placeholder="Ingrese la relación con la persona de referencia"
                  name="relationship"
                  defaultValue={person.relationship}
                  errorMessage="Por favor, ingrese la relación con la persona de referencia"
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Teléfono"
                  placeholder="Ingrese el número de teléfono de la persona de referencia"
                  type="tel"
                  name="phone"
                  defaultValue={person.phone}
                  variant="bordered"
                  errorMessage="Por favor, ingrese el número de teléfono de la persona de referencia"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <SubmitButton />
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
