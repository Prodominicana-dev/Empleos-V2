"use client";

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
  Chip,
  Tooltip,
  ChipProps,
  Pagination,
  Textarea,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import countries from "./countries";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";

import { EyeIcon } from "@/components/icons/eye-icon";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import test from "node:test";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Si: "success",
  No: "danger",
};

export default function QuestionData({ id }: { id: string }) {
  const { data, isLoading, refetch } = useUser(id);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState<any>({});

  const handleRefresh = () => {
    setRefresh((prev) => !prev);
  };

  const handleSubmit = async () => {
    await editUser(data.id, user, refetch, refetch);
  };

  const testData = [
    {
      name: "Juan Perez",
      relation: "Padre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "Maria Perez",
      relation: "Madre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "Pedro Perez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Luis Perez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Ana Perez",
      relation: "Hermana",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Juan asdasda Perez",
      relation: "Padre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "Maria ffghhPerez",
      relation: "Madre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "hjkhjkh Perez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Luis Pjkljrez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Ana Perez",
      relation: "Hermana",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Juan jkljkPerez",
      relation: "Padre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "Maria ewre23Perez",
      relation: "Madre",
      phone: "1234567890",
      works: "Si",
    },
    {
      name: "Pedro 345345Perez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Luis Perez",
      relation: "Hermano",
      phone: "1234567890",
      works: "No",
    },
    {
      name: "Ana Perez",
      relation: "Hermana",
      phone: "1234567890",
      works: "No",
    },
  ];

  // Pagination with testData
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = testData.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Cantidad de paginas
  const pageNumbers = testData.length / postsPerPage;

  if (isLoading) return <UserDataSkeleton />;

  return (
    <div className="flex flex-col gap-5">
      <Card className="w-full p-2">
        <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
          <p className="font-bold text-large">Preguntas</p>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Card className="w-full p-2">
          <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 md:flex-row md:justify-between">
            <p className="text-large">¿Cuántos corazones tiene un pulpo?</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <Textarea minRows={2} placeholder="Escribe tu respuesta" />
          </CardBody>

          {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

          <CardFooter className="justify-end gap-2 mt-4">
            <Button
              variant="flat"
              onClick={handleSubmit}
              disabled={false}
              radius="full"
              className="text-white bg-gradient-to-r from-blue-600 to-sky-500"
            >
              Guardar Respuesta
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-full p-2">
          <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 md:flex-row md:justify-between">
            <p className="text-large">¿Cuántos corazones tiene un pulpo?</p>
          </CardHeader>
          <CardBody className="flex flex-col gap-2">
            <Textarea minRows={2} placeholder="Escribe tu respuesta" />
          </CardBody>

          {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

          <CardFooter className="justify-end gap-2 mt-4">
            <Button
              variant="flat"
              onClick={handleSubmit}
              disabled={false}
              radius="full"
              className="text-white bg-gradient-to-r from-blue-600 to-sky-500"
            >
              Guardar Respuesta
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
