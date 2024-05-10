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
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import { useFormStatus } from "react-dom";
import { createLanguageAction } from "@/actions/language/action";
import { LanguageLevels, Languages } from "@/data/data";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function LanguageDialog({
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
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  const createLanguageWithArgs = createLanguageAction.bind(
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
            <form action={createLanguageWithArgs}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir un idioma
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Compañía"
                  placeholder="Ingrese el nombre de la compañía"
                  name="level"
                  errorMessage="Por favor, ingrese el nombre de la compañía"
                  variant="bordered"
                  value={level}
                  className="hidden"
                />

                <Input
                  isRequired
                  autoFocus
                  label="Posición"
                  placeholder="Ingrese el nombre de la posición"
                  name="name"
                  errorMessage="Por favor, ingrese el nombre de la posición"
                  variant="bordered"
                  value={name}
                  className="hidden"
                />

                <Autocomplete
                  isClearable={false}
                  variant="bordered"
                  defaultItems={Languages}
                  label="Idioma"
                  onSelectionChange={(e: any) => setName(e)}
                  placeholder="Seleccione el idioma que dominas"
                  errorMessage="Por favor, seleccione el tipo de moneda que recibes"
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Autocomplete
                  isClearable={false}
                  variant="bordered"
                  defaultItems={LanguageLevels}
                  label="Nivel de idioma"
                  onSelectionChange={(e: any) => setLevel(e)}
                  placeholder="Seleccione el nivel de idioma que tienes"
                  errorMessage="Por favor, seleccione el nivel de idioma que tienes"
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
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
