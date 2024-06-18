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
import { updateProfessionalReferenceAction } from "@/actions/professionalReference/action";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function EditProfessionalReferenceDialog({
  professionalReference,
  update,
  isOpen,
  onOpenChange,
}: {
  professionalReference: any;
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const updateProfessionalReferenceWithArgs =
    updateProfessionalReferenceAction.bind(
      null,
      professionalReference.id,
      update,
      onOpenChange
    );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={updateProfessionalReferenceWithArgs}>
              <ModalHeader className="flex flex-col gap-1">
                Editar una referencia profesional
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona de referencia"
                  name="name"
                  defaultValue={professionalReference.name}
                  errorMessage="Por favor, ingrese el nombre de la persona de referencia"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Compañía"
                  placeholder="Ingrese la compañía de la persona de referencia"
                  name="company"
                  defaultValue={professionalReference.company}
                  errorMessage="Por favor, ingrese la compañía de la persona de referencia"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Posición"
                  placeholder="Ingrese la posición de la persona de referencia"
                  name="position"
                  defaultValue={professionalReference.position}
                  errorMessage="Por favor, ingrese la posición de la persona de referencia"
                  variant="bordered"
                />

                <Input
                  isRequired
                  label="Teléfono"
                  placeholder="Ingrese el número de teléfono de la persona de referencia"
                  type="tel"
                  name="phone"
                  defaultValue={professionalReference.phone}
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
