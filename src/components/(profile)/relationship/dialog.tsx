"use client";
import React, { useState } from "react";
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
} from "@nextui-org/react";
import { createRelationshipAction } from "@/actions/relationship/action";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function RelationshipDialog({
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
  const [relationship, setRelationship] = useState<string>("");
  const [isInTheCompany, setIsInTheCompany] = useState(false);

  const relationshipData = [
    { label: "Abuelo", value: "abuelo" },
    { label: "Abuela", value: "abuela" },
    { label: "Padre", value: "padre" },
    { label: "Madre", value: "madre" },
    { label: "Tío", value: "tio" },
    { label: "Tía", value: "tia" },
    { label: "Cuñado", value: "cunado" },
    { label: "Cuñada", value: "cunada" },
    { label: "Hermano", value: "hermano" },
    { label: "Hermana", value: "hermana" },
    { label: "Primo", value: "primo" },
    { label: "Prima", value: "prima" },
    { label: "Sobrino", value: "sobrino" },
    { label: "Sobrina", value: "sobrina" },
    { label: "Hijo", value: "hijo" },
    { label: "Hija", value: "hija" },
    { label: "Nieto", value: "nieto" },
    { label: "Nieta", value: "nieta" },
  ];

  const createRelationActionWithArgs = createRelationshipAction.bind(
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
            <form action={createRelationActionWithArgs}>
              <ModalHeader className="flex flex-col gap-1">
                Crear una relación
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona"
                  errorMessage="Por favor, ingrese el nombre de la persona"
                  variant="bordered"
                  name="name"
                />

                <Input
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona"
                  errorMessage="Por favor, ingrese el nombre de la persona"
                  variant="bordered"
                  name="relationship"
                  className="hidden"
                  value={relationship}
                />

                <Autocomplete
                  isRequired
                  variant="bordered"
                  defaultItems={relationshipData}
                  label="Seleccione el parentesco"
                  placeholder="Seleccione el parentesco de la persona"
                  errorMessage="Por favor, seleccione el parentesco de la persona"
                  onSelectionChange={(e: any) => setRelationship(e)}
                >
                  {(item) => (
                    <AutocompleteItem key={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Input
                  isRequired
                  label="Teléfono"
                  placeholder="Ingrese el número de teléfono de la persona"
                  type="tel"
                  variant="bordered"
                  errorMessage="Por favor, ingrese el teléfono de la persona"
                  name="phone"
                />
                <Input
                  isRequired
                  label="Teléfono"
                  placeholder="Ingrese el número de teléfono de la persona"
                  type="tel"
                  variant="bordered"
                  errorMessage="Por favor, ingrese el teléfono de la persona"
                  name="isInTheCompany"
                  className="hidden"
                  value={`${isInTheCompany}`}
                />
                <Checkbox
                  classNames={{ label: "text-small" }}
                  onChange={(e) => {
                    setIsInTheCompany(e.target.checked);
                  }}
                >
                  ¿Trabaja en <span className="font-bold">ProDominicana</span>?
                </Checkbox>
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
