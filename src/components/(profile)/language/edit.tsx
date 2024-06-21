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
import {
  createLanguageAction,
  updateLanguageAction,
} from "@/actions/language/action";
import { LanguageLevels, Languages } from "@/data/data";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function EditLanguageDialog({
  language,
  update,
  isOpen,
  onOpenChange,
}: {
  language: any;
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<number>(0);

  useEffect(() => {
    setName(language.name);
    setLevel(language.level);
  }, [language]);

  const updateLanguageWithArgs = updateLanguageAction.bind(
    null,
    language.id,
    update,
    onOpenChange
  );

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={updateLanguageWithArgs}>
              <ModalHeader className="flex flex-col gap-1">
                Edita un idioma
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
                  type="number"
                  value={`${level}`}
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
                  defaultSelectedKey={name}
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
                  defaultSelectedKey={`${level}`}
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
