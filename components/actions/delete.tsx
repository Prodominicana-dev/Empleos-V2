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
} from "@nextui-org/react";
import {
  createEducationAction,
  updateEducationAction,
} from "@/actions/education/actions";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending, action, method } = useFormStatus();
  return (
    <Button type="submit" color="danger" aria-disabled={pending}>
      {pending ? "Eliminando..." : "Eliminar"}
    </Button>
  );
};

export default function Delete({
  id,
  name,
  deleteAction,
  isOpen,
  onOpenChange,
}: {
  id: string;
  name: any;
  deleteAction: any;
  isOpen: boolean;
  onOpenChange: any;
}) {
  const [confirm, setConfirm] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    if (confirm === name) {
      return setIsConfirmed(true);
    }
    return setIsConfirmed(false);
  }, [confirm]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="lg"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form action={deleteAction}>
              <ModalHeader className="flex flex-col gap-1">
                <h1>
                  ¿Estás seguro de que deseas eliminar{" "}
                  <span className="font-bold text-red-600">
                    {"'"}
                    {name}
                    {"'"}
                  </span>
                  ?
                </h1>
              </ModalHeader>
              <ModalBody>
                <h2>
                  Para confirmar que estás seguro de eliminar este registro, por
                  favor escriba:
                </h2>
                <p className="w-full p-2 font-bold text-center rounded-lg bg-white/20">
                  {name}
                </p>
                <Input
                  isRequired
                  autoFocus
                  placeholder="Ingrese la confirmación"
                  errorMessage="Por favor, confirme que está seguro de eliminar este registro"
                  variant="bordered"
                  onChange={(e) => {
                    setConfirm(e.target.value);
                  }}
                />
                <p className="text-xs">
                  Una vez eliminado este registro no se puede recuperar.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                {isConfirmed && <SubmitButton />}
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
