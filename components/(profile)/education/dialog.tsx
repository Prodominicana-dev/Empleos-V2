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
import { createEducationAction } from "@/actions/education/actions";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function EducationDialog({
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
  const [isStudying, setIsStudying] = useState(false);
  const [degreeId, setDegreeId] = useState<string>("");

  const createEducationWithId = createEducationAction.bind(
    null,
    id,
    update,
    onOpenChange
  );

  const degrees = [
    { label: "Secundaria", value: "aaa" },
    { label: "Basico", value: "bbb" },
    { label: "Universitario", value: "clvzeuwgy00009yfhhaytgvn4" },
  ];

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={createEducationWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir una registro académico
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Título"
                  placeholder="Ingrese el título de la educación"
                  name="title"
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                />
                <Input
                  isRequired
                  autoFocus
                  label="Institución"
                  placeholder="Ingrese el nombre de la institución"
                  name="institution"
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                />
                <Input
                  isRequired
                  autoFocus
                  label="Institución"
                  placeholder="Ingrese el nombre de la institución"
                  name="degreeId"
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                  value={degreeId}
                  className="hidden"
                />

                <Autocomplete
                  isRequired
                  variant="bordered"
                  defaultItems={degrees}
                  label="Grado académico"
                  onSelectionChange={(e: any) => setDegreeId(e)}
                  placeholder="Seleccione el grado académico"
                  errorMessage="Por favor, seleccione el grado académico"
                >
                  {(item) => (
                    <AutocompleteItem key={item.value} value={item.value}>
                      {item.label}
                    </AutocompleteItem>
                  )}
                </Autocomplete>

                <Input
                  isRequired
                  label="Area de estudio"
                  placeholder="Ingrese el area de estudio"
                  type="text"
                  name="area"
                  variant="bordered"
                  errorMessage="Por favor, ingrese el area de estudio"
                />

                {isStudying ? (
                  <>
                    {" "}
                    <DatePicker
                      label="Fecha de inicio"
                      name="startDate"
                      isRequired
                      showMonthAndYearPickers
                      maxValue={today(getLocalTimeZone())}
                      variant="bordered"
                    />
                    <DatePicker
                      label="Fecha de inicio"
                      name="endDate"
                      isRequired
                      showMonthAndYearPickers
                      maxValue={today(getLocalTimeZone())}
                      variant="bordered"
                      value={null}
                      className="hidden"
                    />
                  </>
                ) : (
                  <DateRangePicker
                    isRequired
                    label="Fecha de inicio y fin de estudios"
                    visibleMonths={2}
                    maxValue={today(getLocalTimeZone())}
                    pageBehavior="single"
                    variant="bordered"
                    startName="startDate"
                    endName="endDate"
                  />
                )}
                <Checkbox
                  onChange={(e) => setIsStudying(e.target.checked)}
                  classNames={{ label: "text-small" }}
                >
                  ¿Estás cursando actualmente?
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
