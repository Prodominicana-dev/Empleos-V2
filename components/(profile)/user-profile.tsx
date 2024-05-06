"use client";

import type { CardProps } from "@nextui-org/react";

import React, { useEffect, useState } from "react";
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

export default function UserData({ id }: { id: string }) {
  const { data, isLoading, refetch } = useUser(id);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    if (!isLoading && data) {
      console.log(data);
      setUser({
        name: data.name,
        username: data.username,
        email: data.email,
        telephone: data.telephone,
        phone: data.phone,
        country: data.country,
        birthdate: data.birthdate,
        documentType: data.documentType,
        documentNumber: data.documentNumber,
        civilStatus: data.civilStatus,
        hasLicense: data.hasLicense,
        hasVehicule: data.hasVehicule,
        gender: data.gender,
        nationality: data.nationality,
        province: data.province,
      });
    }
  }, [data, isLoading]);

  useEffect(() => {
    refetch().then((e: any) => {
      // Asignar data a user
      setUser({
        name: e.data.name,
        username: e.data.username,
        email: e.data.email,
        telephone: e.data.telephone,
        phone: e.data.phone,
        country: e.data.country,
        birthdate: e.data.birthdate,
        documentType: e.data.documentType,
        documentNumber: e.data.documentNumber,
        civilStatus: e.data.civilStatus,
        hasLicense: e.data.hasLicense,
        hasVehicule: e.data.hasVehicule,
      });
    });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleSubmit = async () => {
    await editUser(data.id, user, refetch, refetch);
  };

  if (isLoading) return <UserDataSkeleton />;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <p className="text-large">Detalles de la cuenta</p>
        <div className="flex gap-4 py-4">
          <Badge
            disableOutline
            classNames={{
              badge: "w-5 h-5",
            }}
            color="primary"
            content={
              <Button
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
            <Avatar className="h-14 w-14" src={data?.image} />
          </Badge>
          <div className="flex flex-col items-start justify-center">
            <p className="font-medium">{user.name}</p>
            <span className="text-small text-default-500">{user.username}</span>
          </div>
        </div>
        <p className="text-small text-default-400">
          Esta foto podrá ser visible por los administradores de la plataforma.
        </p>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {/* First Name */}
          <Input
            label="Nombre completo"
            labelPlacement="outside"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Ingrese su nombre completo"
          />
          {/* Username */}
          <Input
            label="Usuario"
            labelPlacement="outside"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            isDisabled={
              user.username !== user.email && user.username && user.email
                ? true
                : false
            }
            placeholder="Ingrese el usuario"
          />
          {/* Email */}
          <Input
            label="Correo electrónico"
            labelPlacement="outside"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            isDisabled
            placeholder="Ingrese el correo electrónico"
          />

          {/* Teléfono */}
          <Input
            label="Número de teléfono residencial"
            labelPlacement="outside"
            value={user.telephone}
            onChange={(e) => setUser({ ...user, telephone: e.target.value })}
            placeholder="Ingrese su número de teléfono"
          />
          {/* Celular */}
          <Input
            label="Número de teléfono celular"
            labelPlacement="outside"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="Ingrese su número de teléfono celular"
          />
          {/* Country */}
          <Autocomplete
            defaultItems={countries}
            label="País de nacimiento"
            labelPlacement="outside"
            placeholder="Seleccione su país de nacimiento"
            selectedKey={user.country}
            onSelectionChange={(e) => setUser({ ...user, country: e })}
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
            selectedKey={user.nationality}
            onSelectionChange={(e) => setUser({ ...user, nationality: e })}
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
            value={user.province}
            onChange={(e) => setUser({ ...user, province: e.target.value })}
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
            selectedKey={user.documentType}
            onSelectionChange={(e) => setUser({ ...user, documentType: e })}
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
            value={user.documentNumber}
            onChange={(e) =>
              setUser({ ...user, documentNumber: e.target.value })
            }
            placeholder="Ingrese el número de documento"
          />
          {/* Nationality */}
          <Autocomplete
            defaultItems={[
              { type: "Estudiante", value: "estudiante" },
              { type: "Soltero/a", value: "soltero/a" },
              { type: "Casado/a", value: "casado/a" },
            ]}
            label="Estado civil"
            labelPlacement="outside"
            placeholder="Seleccione su estado civil"
            selectedKey={user.civilStatus}
            onSelectionChange={(e) => setUser({ ...user, civilStatus: e })}
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
          <DatePicker label="Fecha de nacimiento" labelPlacement="outside" />
        </div>
        <Divider />
        <div className="flex flex-col gap-5 lg:flex-row">
          <Checkbox
            onChange={(e) => setUser({ ...user, hasLicense: e.target.checked })}
            isSelected={user.hasLicense}
            size="md"
          >
            Tiene licencia de conducir?
          </Checkbox>
          <Checkbox
            onChange={(e) =>
              setUser({ ...user, hasVehicule: e.target.checked })
            }
            isSelected={user.hasVehicule}
            size="md"
          >
            Tiene vehiculo?
          </Checkbox>
        </div>
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      <CardFooter className="justify-end gap-2 mt-4">
        <Button
          isDisabled={
            user.name !== data.name ||
            user.username !== data.username ||
            user.email !== data.email ||
            user.telephone !== data.telephone ||
            user.phone !== data.phone ||
            user.country !== data.country ||
            user.birthdate !== data.birthdate ||
            user.documentType !== data.documentType ||
            user.documentNumber !== data.documentNumber ||
            user.civilStatus !== data.civilStatus ||
            user.hasLicense !== data.hasLicense ||
            user.hasVehicule !== data.hasVehicule
              ? false
              : true
          }
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
