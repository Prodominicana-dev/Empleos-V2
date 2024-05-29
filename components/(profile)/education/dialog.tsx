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
import { useCareers } from "@/service/education/careers/service";

type Career = {
  label: string;
  value: string;
};

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
  degrees,
  update,
  isOpen,
  onOpenChange,
}: {
  id: string;
  degrees: { label: string; value: string }[];
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const [isStudying, setIsStudying] = useState(false);
  const [degreeId, setDegreeId] = useState<string>("");
  const [careerId, setCareerId] = useState<string>("");

  const [careersOptions, setCareersOptions] = useState<Career[]>([]);

  const { data: careers, isLoading: isLoadingCareers } = useCareers();

  useEffect(() => {
    if (careers && !isLoadingCareers) {
      setCareersOptions(
        careers.map((career: any) => ({
          label: career.name,
          value: career.id,
        }))
      );
    }
  }, [careers, isLoadingCareers]);

  useEffect(() => {
    // Si el degreeId no es el universitario/grado, entonces se limpia el careerId
    if (degreeId !== "") {
      degrees.find(
        (degree) =>
          degree.value === degreeId &&
          (degree.label.toLowerCase() === "universitario" ||
            degree.label.toLowerCase() === "grado")
      )
        ? setCareerId(degreeId)
        : setCareerId("");
    }
  }, [degreeId]);

  const createEducationWithId = createEducationAction.bind(
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
            <form action={createEducationWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir una registro académico
              </ModalHeader>
              <ModalBody>
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

                {degrees.find(
                  (degree) =>
                    degree.value === degreeId &&
                    (degree.label.toLowerCase() === "universitario" ||
                      degree.label.toLowerCase() === "grado")
                ) && (
                  <>
                    <Input
                      isRequired
                      label="Institución"
                      placeholder="Ingrese el nombre de la institución"
                      name="careerId"
                      errorMessage="Por favor, ingrese el nombre de la institución"
                      variant="bordered"
                      value={careerId}
                      className="hidden"
                    />

                    <Autocomplete
                      isRequired
                      variant="bordered"
                      defaultItems={careersOptions}
                      label="Licenciatura / Carrera Universitaria"
                      onSelectionChange={(e: any) => setCareerId(e)}
                      placeholder="Seleccione la carrera universitaria"
                      errorMessage="Por favor, seleccione la carrera universitaria"
                    >
                      {(item) => (
                        <AutocompleteItem key={item.value} value={item.value}>
                          {item.label}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                  </>
                )}

                <Input
                  label="Título"
                  placeholder="Ingrese el título de la educación"
                  name="title"
                  variant="bordered"
                  errorMessage="Por favor, ingrese el area de estudio"
                />

                <Input
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
                    maxValue={today(getLocalTimeZone())}
                    pageBehavior="single"
                    variant="bordered"
                    startName="startDate"
                    endName="endDate"
                    showMonthAndYearPickers
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
