"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { createProfessionalReferenceAction } from "@/actions/professionalReference/action";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function ProfessionalReferenceDialog({
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
  const createProfessionalReferenceWithId =
    createProfessionalReferenceAction.bind(null, id, update, onOpenChange);

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={createProfessionalReferenceWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir una referencia profesional
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
                  label="Compañía"
                  placeholder="Ingrese la compañía de la persona de referencia"
                  name="company"
                  errorMessage="Por favor, ingrese la compañía de la persona de referencia"
                  variant="bordered"
                />
                <Input
                  isRequired
                  label="Posición"
                  placeholder="Ingrese la posición de la persona de referencia"
                  name="position"
                  errorMessage="Por favor, ingrese la posición de la persona de referencia"
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
