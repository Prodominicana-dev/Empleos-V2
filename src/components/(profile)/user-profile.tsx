"use client";

import type { CalendarDate, CardProps } from "@nextui-org/react";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Avatar,
  Badge,
  Input,
  Autocomplete,
  AutocompleteItem,
  CardFooter,
  DatePicker,
  Checkbox,
  Divider,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import countries from "./countries";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";
import { parseDate } from "@internationalized/date";
import Image from "next/image";

export default function UserData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const [users, setUser] = useState<any>({});
  const [refresh, setRefresh] = useState(false);
  const [birthdate, setBirthdate] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      setUser(user);
      const date = new Date(user?.birthdate);
      // Convertir date en CalendarDate usando el parseDate
      //const parsedDate = parseDate(date?.toISOString().split("T")[0]);
      //console.log(parsedDate);
      //setBirthdate(parsedDate);
      //setBirthdate(parseDate(date.toISOString().split("T")[0]));
    }
    setLoading(false);
  }, [user]);

  // Validar si el usuario cambio con respecto a la data que se obtuvo
  const handleDisable = () => {
    if (
      users.name !== user.name ||
      users.username !== user.username ||
      users.email !== user.email ||
      users.telephone !== user.telephone ||
      users.phone !== user.phone ||
      users.country !== user.country ||
      users.name !== user.name ||
      users.username !== user.username ||
      users.email !== user.email ||
      users.telephone !== user.telephone ||
      users.phone !== user.phone ||
      users.country !== user.country ||
      users.province !== user.province ||
      users.birthdate !== user.birthdate ||
      users.documentType !== user.documentType ||
      users.documentNumber !== user.documentNumber ||
      users.civilStatus !== user.civilStatus ||
      users.hasLicense !== user.hasLicense ||
      users.hasVehicule !== user.hasVehicule ||
      file !== null
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    console.log(users.hasLicense, users.hasVehicule);
    const formData = new FormData();
    formData.append("username", users.username);
    formData.append("email", users.email);
    formData.append("name", users.name);
    formData.append("image", users.image);
    formData.append("telephone", users.telephone);
    formData.append("phone", users.phone);
    formData.append("country", users.country);
    formData.append("nationality", users.nationality);
    formData.append("province", users.province);
    //formData.append("gender", users.gender)
    if (users.birthdate) formData.append("birthdate", users.birthdate);
    formData.append("documentType", users.documentType);
    formData.append("documentNumber", users.documentNumber);
    formData.append("civilStatus", users.civilStatus);
    if (users.hasLicense !== null)
      formData.append("hasLicense", users.hasLicense);
    if (users.hasVehicule !== null)
      formData.append("hasVehicule", users.hasVehicule);
    if (file) {
      formData.append("images", file as File);
    }
    await editUser(user.id, formData, update);
    setFile(null);
  };

  if (loading) return <UserDataSkeleton />;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <p className="font-bold text-large">Detalles de la cuenta</p>
        <div className="flex gap-4 py-4">
          <Badge
            disableOutline
            classNames={{
              badge: "w-5 h-5",
            }}
            color="primary"
            content={
              <Button
                onClick={handleClick}
                isIconOnly
                className="p-0 text-primary-foreground"
                radius="full"
                size="sm"
                variant="light"
              >
                <Icon icon="solar:pen-2-linear" />
              </Button>
            }
            placement="bottom-right"
            shape="circle"
          >
            {users.image && users.image.startsWith("http") && !file && (
              <Avatar className="h-14 w-14" src={users?.image} />
            )}
            {file && (
              <Avatar className="h-14 w-14" src={URL.createObjectURL(file)} />
            )}
            {users.image && !users.image.startsWith("http") && !file && (
              <Avatar
                className="h-14 w-14"
                src={`${process.env.NEXT_PUBLIC_API_URL}/user/${user.id}/img/${user.image}`}
              />
            )}
          </Badge>
          <div className="flex flex-col items-start justify-center">
            <p className="font-medium">{users.name}</p>
            <span className="text-small text-default-500">
              {users.username}
            </span>
          </div>
        </div>
        <p className="text-small text-default-400">
          Esta foto podrá ser visible por los administradores de la plataforma.
        </p>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <input
            type="file"
            accept="image/jpeg, image/png"
            multiple={false}
            className="hidden"
            ref={inputRef}
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          {/* First Name */}
          <Input
            label="Nombre completo"
            labelPlacement="outside"
            value={users.name}
            onChange={(e) => setUser({ ...users, name: e.target.value })}
            placeholder="Ingrese su nombre completo"
          />
          {/* Username */}
          <Input
            label="Usuario"
            labelPlacement="outside"
            value={users.username}
            onChange={(e) => setUser({ ...users, username: e.target.value })}
            isDisabled={
              users.username !== users.email && users.username && users.email
                ? true
                : false
            }
            placeholder="Ingrese el usuario"
          />
          {/* Email */}
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            value={users.email}
            onChange={(e) => setUser({ ...users, email: e.target.value })}
            isDisabled
            placeholder="Ingrese el correo electrónico"
          />

          {/* Teléfono */}
          <Input
            label="Número de teléfono residencial"
            labelPlacement="outside"
            value={users.telephone}
            onChange={(e) => setUser({ ...users, telephone: e.target.value })}
            placeholder="Ingrese su número de teléfono"
          />
          {/* Celular */}
          <Input
            label="Número de teléfono celular"
            labelPlacement="outside"
            value={users.phone}
            onChange={(e) => setUser({ ...users, phone: e.target.value })}
            placeholder="Ingrese su número de teléfono celular"
          />
          {/* Country */}
          <Autocomplete
            defaultItems={countries}
            label="País de nacimiento"
            labelPlacement="outside"
            placeholder="Seleccione su país de nacimiento"
            selectedKey={users.country}
            onSelectionChange={(e) => setUser({ ...users, country: e })}
            showScrollIndicators={false}
          >
            {(item: any) => (
              <AutocompleteItem
                key={item.code_2}
                startContent={
                  <Avatar
                    alt="Country Flag"
                    className="w-6 h-6"
                    src={`https://flagcdn.com/${item.code_2.toLowerCase()}.svg`}
                  />
                }
                value={item.code_2}
              >
                {item.name_es}
              </AutocompleteItem>
            )}
          </Autocomplete>
          {/* Nationality */}
          <Autocomplete
            defaultItems={countries}
            label="Nacionalidad"
            labelPlacement="outside"
            placeholder="Seleccione su nacionalidad"
            selectedKey={users.nationality}
            onSelectionChange={(e) => setUser({ ...users, nationality: e })}
            showScrollIndicators={false}
          >
            {(item: any) => (
              <AutocompleteItem
                key={item.code_2}
                startContent={
                  <Avatar
                    alt="Country Flag"
                    className="w-6 h-6"
                    src={`https://flagcdn.com/${item.code_2.toLowerCase()}.svg`}
                  />
                }
                value={item.code_2}
              >
                {item.name_es}
              </AutocompleteItem>
            )}
          </Autocomplete>

          {/* State */}
          <Input
            label="Provincia"
            labelPlacement="outside"
            value={users.province}
            onChange={(e) => setUser({ ...users, province: e.target.value })}
            placeholder="Ingrese la provincia de residencia"
          />
          {/* Document type */}
          <Autocomplete
            defaultItems={[
              { type: "Cédula", value: "cedula" },
              { type: "Pasaporte", value: "pasaporte" },
            ]}
            label="Tipo de documento"
            labelPlacement="outside"
            placeholder="Seleccione su nacionalidad"
            selectedKey={users.documentType}
            onSelectionChange={(e) => setUser({ ...users, documentType: e })}
            showScrollIndicators={false}
            isClearable={false}
          >
            {(item: any) => (
              <AutocompleteItem key={item.value} value={item.type}>
                {item.type}
              </AutocompleteItem>
            )}
          </Autocomplete>

          {/* State */}
          <Input
            label="Documento"
            labelPlacement="outside"
            value={users.documentNumber}
            onChange={(e) =>
              setUser({ ...users, documentNumber: e.target.value })
            }
            placeholder="Ingrese el número de documento"
          />
          {/* Nationality */}
          <Autocomplete
            defaultItems={[
              { type: "Soltero/a", value: "soltero/a" },
              { type: "Casado/a", value: "casado/a" },
            ]}
            label="Estado civil"
            labelPlacement="outside"
            placeholder="Seleccione su estado civil"
            selectedKey={users.civilStatus}
            onSelectionChange={(e) => setUser({ ...users, civilStatus: e })}
            showScrollIndicators={false}
            isClearable={false}
          >
            {(item: any) => (
              <AutocompleteItem key={item.value} value={item.type}>
                {item.type}
              </AutocompleteItem>
            )}
          </Autocomplete>
          {/* Celular */}
          <DatePicker
            label="Fecha de nacimiento"
            labelPlacement="outside"
            onChange={(e: any) => {
              setUser({
                ...users,
                birthdate: new Date(e as string).toISOString(),
              });
              setBirthdate(e);
            }}
            showMonthAndYearPickers
            value={birthdate}
          />
        </div>
        <Divider />
        <div className="flex flex-col gap-5 lg:flex-row">
          <Checkbox
            onChange={(e) =>
              setUser({
                ...users,
                hasLicense: e.target.checked === true ? true : null,
              })
            }
            isSelected={users.hasLicense}
            size="md"
            classNames={{
              label: "text-small",
            }}
          >
            ¿Tiene licencia de conducir?
          </Checkbox>
          <Checkbox
            onChange={(e) =>
              setUser({
                ...users,
                hasVehicule: e.target.checked === true ? true : null,
              })
            }
            isSelected={users.hasVehicule}
            size="md"
            classNames={{
              label: "text-small",
            }}
          >
            ¿Tiene vehiculo?
          </Checkbox>
        </div>
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      <CardFooter className="justify-end gap-2 mt-4">
        <Button
          isDisabled={handleDisable()}
          onPress={handleSubmit}
          color="primary"
          radius="full"
        >
          Guardar cambios
        </Button>
      </CardFooter>
    </Card>
  );
}
