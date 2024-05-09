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
import { createRelationship } from "@/service/relationship/service";

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
  const [relation, setRelation] = useState({
    name: "",
    relationship: "",
    phone: "",
    isInTheCompany: false,
    userId: id,
  });
  const [warning, setWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (
      relation.name === "" ||
      relation.relationship === "" ||
      relation.phone === ""
    ) {
      setWarning(true);
      return;
    }
    console.log(relation);
    setWarning(false);
    await createRelationship(relation, update, onOpenChange);
    setIsLoading(false);
  };

  const relationship = [
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

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Crear una relación
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Nombre"
                  placeholder="Ingrese el nombre de la persona"
                  isInvalid={warning && relation.name === ""}
                  errorMessage="Por favor, ingrese el nombre de la persona"
                  variant="bordered"
                  value={relation.name}
                  onChange={(e) =>
                    setRelation({ ...relation, name: e.target.value })
                  }
                />

                <Autocomplete
                  isRequired
                  variant="bordered"
                  defaultItems={relationship}
                  label="Seleccione el parentesco"
                  placeholder="Seleccione el parentesco de la persona"
                  isInvalid={warning && relation.relationship === ""}
                  errorMessage="Por favor, seleccione el parentesco de la persona"
                  selectedKey={relation.relationship}
                  onSelectionChange={(e: any) =>
                    setRelation({ ...relation, relationship: e })
                  }
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
                  isInvalid={warning && relation.phone === ""}
                  errorMessage="Por favor, ingrese el teléfono de la persona"
                  value={relation.phone}
                  onChange={(e) =>
                    setRelation({ ...relation, phone: e.target.value })
                  }
                />
                <Checkbox
                  onChange={(e) =>
                    setRelation({
                      ...relation,
                      isInTheCompany: e.target.checked,
                    })
                  }
                  isSelected={relation.isInTheCompany}
                  classNames={{ label: "text-small" }}
                >
                  ¿Trabaja en <span className="font-bold">ProDominicana</span>?
                </Checkbox>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
