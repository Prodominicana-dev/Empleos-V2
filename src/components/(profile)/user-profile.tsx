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
  Tooltip,
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
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClick = () => {
    inputRef.current.click();
  };

  // console.log("User Data:", user);
  // console.log("ANTES DE ENVIAR");
  // console.log("users.hasLicense:", users.hasLicense); // debe ser false si está desmarcado
  // console.log("users.hasVehicule:", users.hasVehicule);

  useEffect(() => {
    if (!user) return;

    // Si aún no se ha seteado el usuario en el estado interno
    if (!users?.id) {
      const formattedUser = {
        ...user,
        hasLicense: user.hasLicense === true,
        hasVehicule: user.hasVehicule === true,
      };

      setUser(formattedUser);

      if (user?.birthdate) {
        const date = new Date(user.birthdate);
        setBirthdate(parseDate(date.toISOString().split("T")[0]));
      }

      // Convertir date en CalendarDate usando el parseDate
      //const parsedDate = parseDate(date?.toISOString().split("T")[0]);
      //console.log(parsedDate);
      //setBirthdate(parsedDate);
      //setBirthdate(parseDate(date.toISOString().split("T")[0]));
    }
  }, [user, users?.id]);

  const validateAll = () => {
    const requiredFields = [
      "name",
      "username",
      "email",
      "telephone",
      "phone",
      "country",
      "nationality",
      "province",
      "documentType",
      "documentNumber",
      "civilStatus",
      "birthdate",
    ];

    const newErrors: { [key: string]: string } = {};

    requiredFields.forEach((field) => {
      const value = users[field];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);

    const allTouched = requiredFields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as { [key: string]: boolean });

    setTouched(allTouched);

    return Object.keys(newErrors).length === 0;
  };
  const validateField = (field: string, value: string) => {
    if (!value || value.trim() === "") {
      return "Este campo es obligatorio";
    }
    return "";
  };

  const handleDisable = () => {
    if (!user) return true;

    const noChanges =
      users.name === user.name &&
      users.username === user.username &&
      users.email === user.email &&
      users.telephone === user.telephone &&
      users.phone === user.phone &&
      users.country === user.country &&
      users.province === user.province &&
      users.birthdate === user.birthdate &&
      users.documentType === user.documentType &&
      users.documentNumber === user.documentNumber &&
      users.civilStatus === user.civilStatus &&
      users.hasLicense === user.hasLicense &&
      users.hasVehicule === user.hasVehicule &&
      file === null;

    return noChanges;
  };

  const handleSubmit = async () => {
    const isValid = validateAll();
    if (!isValid) return;
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
      formData.append("hasLicense", users.hasLicense ? "true" : "false");
    if (users.hasVehicule !== null)
      formData.append("hasVehicule", users.hasVehicule ? "true" : "false");
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
          <div className="relative flex">
            <Input
              label="Nombre completo"
              labelPlacement="outside"
              value={users.name}
              onChange={(e) => setUser({ ...users, name: e.target.value })}
              placeholder="Ingrese su nombre completo"
              onBlur={() => {
                setTouched({ ...touched, name: true });
                setErrors({
                  ...errors,
                  name: validateField("name", users.name),
                });
              }}
              isInvalid={touched.name && !!errors.name}
              errorMessage={touched.name && errors.name}
            />
            <span className="absolute left-[112px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Username */}
          <div className="relative flex">
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
              onBlur={() => {
                setTouched({ ...touched, username: true });
                setErrors({
                  ...errors,
                  username: validateField("username", users.username),
                });
              }}
              isInvalid={touched.username && !!errors.username}
              errorMessage={touched.username && errors.username}
            />
            <span className="absolute left-[50px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Email */}
          <div className="relative flex">
            <Input
              label="Correo electrónico"
              labelPlacement="outside"
              value={users.email}
              onChange={(e) => setUser({ ...users, email: e.target.value })}
              isDisabled
              placeholder="Ingrese el correo electrónico"
              onBlur={() => {
                setTouched({ ...touched, email: true });
                setErrors({
                  ...errors,
                  email: validateField("email", users.email),
                });
              }}
              isInvalid={touched.email && !!errors.email}
              errorMessage={touched.email && errors.email}
            />
            <span className="absolute left-[116px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Teléfono */}
          <div className="relative flex">
            <Input
              label="Número de teléfono residencial"
              labelPlacement="outside"
              value={users.telephone}
              onChange={(e) => setUser({ ...users, telephone: e.target.value })}
              placeholder="Ingrese su número de teléfono"
              onBlur={() => {
                setTouched({ ...touched, telephone: true });
                setErrors({
                  ...errors,
                  telephone: validateField("telephone", users.telephone),
                });
              }}
              isInvalid={touched.telephone && !!errors.telephone}
              errorMessage={touched.telephone && errors.telephone}
            />
            <span className="absolute left-[196px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Celular */}
          <div className="relative flex">
            <Input
              label="Número de teléfono celular"
              labelPlacement="outside"
              value={users.phone}
              onChange={(e) => setUser({ ...users, phone: e.target.value })}
              placeholder="Ingrese su número de teléfono celular"
              onBlur={() => {
                setTouched({ ...touched, phone: true });
                setErrors({
                  ...errors,
                  phone: validateField("phone", users.phone),
                });
              }}
              isInvalid={touched.phone && !!errors.phone}
              errorMessage={touched.phone && errors.phone}
            />
            <span className="absolute left-[169px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Country */}
          <div className="relative flex">
            <Autocomplete
              defaultItems={countries}
              label="País de nacimiento"
              labelPlacement="outside"
              placeholder="Seleccione su país de nacimiento"
              selectedKey={users.country}
              onSelectionChange={(e) => setUser({ ...users, country: e })}
              showScrollIndicators={false}
              onBlur={() => {
                setTouched({ ...touched, country: true });
                setErrors({
                  ...errors,
                  country: validateField("country", users.country),
                });
              }}
              isInvalid={touched.country && !!errors.country}
              errorMessage={touched.country && errors.country}
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
            <span className="absolute left-[122px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Nationality */}
          <div className="relative flex">
            <Autocomplete
              defaultItems={countries}
              label="Nacionalidad"
              labelPlacement="outside"
              placeholder="Seleccione su nacionalidad"
              selectedKey={users.nationality}
              onSelectionChange={(e) => setUser({ ...users, nationality: e })}
              showScrollIndicators={false}
              onBlur={() => {
                setTouched({ ...touched, nationality: true });
                setErrors({
                  ...errors,
                  nationality: validateField("nationality", users.nationality),
                });
              }}
              isInvalid={touched.nationality && !!errors.nationality}
              errorMessage={touched.nationality && errors.nationality}
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
            <span className="absolute left-[82px] top-[1px] text-red-500">
              *
            </span>
          </div>

          {/* State */}
          <div className="relative flex">
            <Input
              label="Provincia"
              labelPlacement="outside"
              value={users.province}
              onChange={(e) => setUser({ ...users, province: e.target.value })}
              placeholder="Ingrese la provincia de residencia"
              onBlur={() => {
                setTouched({ ...touched, province: true });
                setErrors({
                  ...errors,
                  province: validateField("province", users.province),
                });
              }}
              isInvalid={touched.province && !!errors.province}
              errorMessage={touched.province && errors.province}
            />
            <span className="absolute left-[59px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Document type */}
          <div className="relative flex">
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
              onBlur={() => {
                setTouched({ ...touched, documentType: true });
                setErrors({
                  ...errors,
                  documentType: validateField(
                    "documentType",
                    users.documentType
                  ),
                });
              }}
              isInvalid={touched.documentType && !!errors.documentType}
              errorMessage={touched.documentType && errors.documentType}
            >
              {(item: any) => (
                <AutocompleteItem key={item.value} value={item.type}>
                  {item.type}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <span className="absolute left-[120px] top-[1px] text-red-500">
              *
            </span>
          </div>

          {/* State */}

          <div className="relative flex">
            <Input
              label="Documento"
              labelPlacement="outside"
              value={users.documentNumber}
              onChange={(e) =>
                setUser({ ...users, documentNumber: e.target.value })
              }
              placeholder="Ingrese el número de documento"
              onBlur={() => {
                setTouched({ ...touched, documentNumber: true });
                setErrors({
                  ...errors,
                  documentNumber: validateField(
                    "documentNumber",
                    users.documentNumber
                  ),
                });
              }}
              isInvalid={touched.documentNumber && !!errors.documentNumber}
              errorMessage={touched.documentNumber && errors.documentNumber}
            />
            <span className="absolute left-[72px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Nationality */}
          <div className="relative flex">
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
              onBlur={() => {
                setTouched({ ...touched, civilStatus: true });
                setErrors({
                  ...errors,
                  civilStatus: validateField(
                    "nacivilStatusme",
                    users.civilStatus
                  ),
                });
              }}
              isInvalid={touched.civilStatus && !!errors.civilStatus}
              errorMessage={touched.civilStatus && errors.civilStatus}
            >
              {(item: any) => (
                <AutocompleteItem key={item.value} value={item.type}>
                  {item.type}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <span className="absolute left-[72px] top-[1px] text-red-500">
              *
            </span>
          </div>
          {/* Born Date */}
          <div className="relative flex">
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
              onBlur={() => {
                setTouched({ ...touched, birthdate: true });
                setErrors({
                  ...errors,
                  birthdate: validateField("birthdate", users.birthdate),
                });
              }}
              isInvalid={touched.birthdate && !!errors.birthdate}
              errorMessage={touched.birthdate && errors.birthdate}
            />
            <span className="absolute left-[131px] top-[1px] text-red-500">
              *
            </span>
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-5 lg:flex-row">
          <Checkbox
            isSelected={!!users.hasLicense}
            onChange={(e) =>
              setUser((prev: any) => ({
                ...prev,
                hasLicense: e.target.checked,
              }))
            }
          >
            ¿Tiene licencia de conducir?
          </Checkbox>

          <Checkbox
            isSelected={!!users.hasVehicule}
            onChange={(e) =>
              setUser((prev: any) => ({
                ...prev,
                hasVehicule: e.target.checked,
              }))
            }
          >
            ¿Tiene vehiculo?
          </Checkbox>
        </div>
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      <CardFooter className="justify-end gap-2 mt-4">
        <Tooltip
          content="Modifique al menos un dato para habilitar el botón"
          isDisabled={!handleDisable()}
          placement="top"
        >
          <div className={handleDisable() ? "cursor-not-allowed" : ""}>
            <Button
              isDisabled={handleDisable()}
              onPress={handleSubmit}
              color="primary"
              radius="full"
            >
              Guardar cambios
            </Button>
          </div>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
