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
  console.log(pending, action, method);
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function EditEducationDialog({
  education,
  update,
  isOpen,
  onOpenChange,
}: {
  education: any;
  update: () => void;
  isOpen: any;
  onOpenChange: any;
}) {
  const [isStudying, setIsStudying] = useState(false);
  const [degreeId, setDegreeId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  useEffect(() => {
    console.log(education);
    // Verificar si el usuario esta estudiando actualmente
    if (education.endDate === null) setIsStudying(true);
    // Convertir las fechas a yyyy-mm-dd
    const startDate = new Date(education.startDate);
    if (education.endDate) {
      const endDate = new Date(education.endDate);
      setEndDate(endDate.toISOString().split("T")[0]);
    }
    setStartDate(startDate.toISOString().split("T")[0]);
    // Setear el grado academico
    setDegreeId(education.degreeId);
  }, [education]);

  const updateEducationWithArgs = updateEducationAction.bind(
    null,
    education.id,
    update,
    onOpenChange
  );

  const degrees = [
    { label: "Secundaria", value: "aaa" },
    { label: "Basico", value: "bbb" },
    { label: "Universitario", value: "clvzeuwgy00009yfhhaytgvn4" },
  ];

  if (!education) return null;

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form action={updateEducationWithArgs}>
              <ModalHeader className="flex flex-col gap-1">
                Actualizar registro académico
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  autoFocus
                  label="Título"
                  placeholder="Ingrese el título de la educación"
                  name="title"
                  defaultValue={education.title}
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                />
                <Input
                  isRequired
                  autoFocus
                  label="Institución"
                  placeholder="Ingrese el nombre de la institución"
                  name="institution"
                  defaultValue={education.institution}
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                />
                <Input
                  isRequired
                  autoFocus
                  label="Institución"
                  placeholder="Ingrese el nombre de la institución"
                  name="degreeId"
                  value={degreeId}
                  errorMessage="Por favor, ingrese el nombre de la institución"
                  variant="bordered"
                  className="hidden"
                />

                <Autocomplete
                  isRequired
                  variant="bordered"
                  defaultItems={degrees}
                  label="Grado académico"
                  onSelectionChange={(e: any) => setDegreeId(e)}
                  defaultSelectedKey={education.degreeId}
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
                  defaultValue={education.area}
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
                      defaultValue={parseDate(startDate)}
                      variant="bordered"
                    />
                    <DatePicker
                      label="Fecha de inicio"
                      name="endDate"
                      isRequired
                      showMonthAndYearPickers
                      maxValue={today(getLocalTimeZone())}
                      variant="bordered"
                      defaultValue={null}
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
                    defaultValue={{
                      start: parseDate(startDate),
                      end: parseDate(endDate),
                    }}
                    endName="endDate"
                  />
                )}
                <Checkbox
                  onChange={(e) => setIsStudying(e.target.checked)}
                  checked={isStudying}
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
