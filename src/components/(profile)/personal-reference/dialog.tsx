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
import { createPersonalReferenceAction } from "@/actions/personalReference/action";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function PersonalReferenceDialog({
  id,
  update,
  isOpen,
  onOpenChange,
}: {
  id: string;
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const createPersonalReferenceWithId = createPersonalReferenceAction.bind(
    null,
    id,
    update,
    onOpenChange
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={createPersonalReferenceWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir una referencia personal
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona de referencia"
                  name="name"
                  errorMessage="Por favor, ingrese el nombre de la persona de referencia"
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Relación"
                  placeholder="Ingrese la relación con la persona de referencia"
                  name="relationship"
                  errorMessage="Por favor, ingrese la relación con la persona de referencia"
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Teléfono"
                  placeholder="Ingrese el número de teléfono de la persona de referencia"
                  type="tel"
                  name="phone"
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
