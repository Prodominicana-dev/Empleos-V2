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
import Link from "next/link";
import { addCV } from "@/service/cv/service";
import toast from "react-hot-toast";

export default function CVData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const [users, setUser] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement);

  const handleClick = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    setLoading(true);
    if (user) {
      console.log(user);
      setUser(user);
      const date = new Date(user?.birthdate);
      console.log(date);
      // Convertir date en CalendarDate usando el parseDate
      //const parsedDate = parseDate(date?.toISOString().split("T")[0]);
      //console.log(parsedDate);
      //setBirthdate(parsedDate);
      //setBirthdate(parseDate(date.toISOString().split("T")[0]));
    }
    setLoading(false);
  }, [user]);

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", users.id);
    formData.append("files", file as Blob);
    const response = await addCV(formData, update);
    if (response?.status === 201) {
      setFile(null);
      toast.success("CV registrado correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
    setLoading(false);
  };

  if (loading) return <UserDataSkeleton />;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-start px-4 pt-4 pb-0">
        <p className="font-bold text-large">CV</p>
        <p className="text-small">
          Sube tu CV y déjanos conocer tu lado profesional.
        </p>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files) {
              setFile(e.target.files[0]);
            }
          }}
        />
        <div
          onClick={handleClick}
          className="flex items-center justify-center w-full transition duration-200 bg-white border border-separate h-44 rounded-xl font-dm-sans hover:cursor-pointer hover:bg-gray-100"
        >
          <p>Clic para colocar tu CV</p>
        </div>
        {file && (
          <div className="flex flex-col gap-2">
            <h1 className="font-bold font-dm-sans text-large">
              Archivo por subir
            </h1>
            <div className="flex justify-between w-full gap-5 px-5 py-3 border rounded-xl">
              <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                <Avatar
                  className="object-cover bg-white rounded-none size-14"
                  src={"/svg/pdf.svg"}
                />
                <p className="font-bold text-large">{file.name}</p>
              </div>
              <Button
                onClick={() => setFile(null)}
                className="px-5 py-3 text-white bg-red-600 rounded-xl "
              >
                Eliminar
              </Button>
            </div>
          </div>
        )}
        {users.cv?.length > 0 && (
          <div className="flex flex-col gap-2">
            <h1 className="font-bold font-dm-sans text-large">
              Archivo almacenado
            </h1>
            <div className="flex justify-between w-full gap-5 px-5 py-3 border rounded-xl">
              <div className="flex flex-col items-center justify-center gap-2 lg:flex-row">
                <Avatar
                  className="object-cover bg-white rounded-none size-14"
                  src={"/svg/pdf.svg"}
                />
                <p className="font-bold text-large">
                  {users.cv[0].originalName}
                </p>
              </div>
              <Button
                as={Link}
                href={`${process.env.NEXT_PUBLIC_API_URL}/cv/${users.id}/${users.cv[0].name}`}
                download
                rel="noopener noreferrer"
                target="_blank"
                className="px-5 py-3 text-white bg-red-600 rounded-xl "
              >
                Descargar
              </Button>
            </div>
          </div>
        )}
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      <CardFooter className="justify-end gap-2 mt-4">
        <Button
          isDisabled={file === null}
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
