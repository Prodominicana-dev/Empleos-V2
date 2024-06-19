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

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="primary" aria-disabled={pending}>
      {pending ? "Guardando..." : "Guardar"}
    </Button>
  );
};

export default function ExperienceDialog({
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
  const [isWorking, setIsStudying] = useState(false);
  const [currency, setCurrency] = useState<string>("");

  const createEducationWithId = createExperienceAction.bind(
    null,
    id,
    update,
    onOpenChange
  );

  const currencies = [
    { value: "dop", label: "RD$ - Peso dominicano" },
    { value: "usd", label: "USD $ - Dólar estadounidense" },
    { value: "eur", label: "EUR € - Euro" },
    { value: "gbp", label: "GBP £ - Libra esterlina" },
    { value: "jpy", label: "JPY ¥ - Yen japonés" },
    { value: "aud", label: "AUD $ - Dólar australiano" },
    { value: "cad", label: "CAD $ - Dólar canadiense" },
    { value: "cny", label: "CNY ¥ - Yuan chino" },
    { value: "inr", label: "INR ₹ - Rupia india" },
    { value: "mxn", label: "MXN $ - Peso mexicano" },
    { value: "krw", label: "KRW ₩ - Won surcoreano" },
    { value: "brl", label: "BRL R$ - Real brasileño" },
    { value: "ars", label: "ARS $ - Peso argentino" },
    { value: "chf", label: "CHF Fr - Franco suizo" },
    { value: "rub", label: "RUB ₽ - Rublo ruso" },
    { value: "try", label: "TRY ₺ - Lira turca" },
    { value: "aed", label: "AED د.إ - Dirham de los Emiratos Árabes Unidos" },
    { value: "cop", label: "COP $ - Peso colombiano" },
    { value: "php", label: "PHP ₱ - Peso filipino" },
    { value: "hkd", label: "HKD $ - Dólar de Hong Kong" },
    { value: "sgd", label: "SGD $ - Dólar de Singapur" },
    { value: "nzd", label: "NZD $ - Dólar neozelandés" },
    { value: "thb", label: "THB ฿ - Baht tailandés" },
  ];

  return (
    <>
      <Modal
        isOpen={isOpen}
        size="4xl"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form action={createEducationWithId}>
              <ModalHeader className="flex flex-col gap-1">
                Añadir un registro de experiencia laboral
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                  <Input
                    isRequired
                    autoFocus
                    label="Compañía"
                    placeholder="Ingrese el nombre de la compañía"
                    name="company"
                    errorMessage="Por favor, ingrese el nombre de la compañía"
                    variant="bordered"
                  />

                  <Input
                    isRequired
                    autoFocus
                    label="Posición"
                    placeholder="Ingrese el nombre de la posición"
                    name="position"
                    errorMessage="Por favor, ingrese el nombre de la posición"
                    variant="bordered"
                  />

                  <Input
                    isRequired
                    autoFocus
                    label="Posición"
                    placeholder="Ingrese el nombre de la posición"
                    name="currency"
                    errorMessage="Por favor, ingrese el nombre de la posición"
                    variant="bordered"
                    value={currency}
                    className="hidden"
                  />

                  <Autocomplete
                    isClearable={false}
                    variant="bordered"
                    defaultItems={currencies}
                    label="Moneda"
                    onSelectionChange={(e: any) => setCurrency(e)}
                    placeholder="Seleccione el tipo de moneda que recibes"
                    errorMessage="Por favor, seleccione el tipo de moneda que recibes"
                  >
                    {(item) => (
                      <AutocompleteItem key={item.value} value={item.value}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>

                  <Input
                    isRequired
                    label="Salario al que aspiras"
                    placeholder="Ingrese el salario al que aspiras"
                    type="numeric"
                    min={0}
                    name="salary"
                    variant="bordered"
                    errorMessage="Por favor, ingrese el salario al que aspiras"
                  />

                  <Input
                    isRequired
                    label="Area de trabajo"
                    placeholder="Ingrese el area de trabajo"
                    type="text"
                    name="area"
                    variant="bordered"
                    errorMessage="Por favor, ingrese el area de trabajo"
                  />

                  <Input
                    isRequired
                    label="Supervisor"
                    placeholder="Ingrese el supervisor"
                    type="text"
                    name="supervisor"
                    variant="bordered"
                    errorMessage="Por favor, ingrese el que supervisó su trabajo"
                  />
                  <Input
                    label="Teléfono del supervisor"
                    placeholder="Ingrese el teléfono del supervisor"
                    type="tel"
                    name="phone"
                    variant="bordered"
                    errorMessage="Por favor, ingrese el teléfono del supervisor"
                  />
                  <Input
                    label="Industria"
                    placeholder="Ingrese la industria que pertenece la compañía"
                    type="text"
                    name="industry"
                    variant="bordered"
                    errorMessage="Por favor, ingrese la industria a la que pertenece la compañía"
                  />

                  {isWorking ? (
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
                      label="Fecha de inicio y fin del trabajo"
                      visibleMonths={2}
                      maxValue={today(getLocalTimeZone())}
                      pageBehavior="single"
                      variant="bordered"
                      startName="startDate"
                      endName="endDate"
                    />
                  )}
                </div>
                <Textarea
                  rows={3}
                  label="Funciones"
                  variant="bordered"
                  name="functions"
                />
                <Checkbox
                  onChange={(e) => setIsStudying(e.target.checked)}
                  classNames={{ label: "text-small" }}
                >
                  ¿Estás trabajando aquí actualmente?
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
