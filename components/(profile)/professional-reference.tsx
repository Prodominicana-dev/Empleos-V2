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

export default function ProfessionalRefData({ id }: { id: string }) {
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
      phone: "1234567890",
      company: "Rush Company",
      position: "CEO",
    },
    {
      name: "José Garcia",
      company: "Epic Games",
      phone: "1234567890",
      position: "Graphic Developer",
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
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
        <p className="font-bold text-large">Referencia Profesional</p>
        <div className="flex items-center gap-3">
          <Input
            placeholder="Buscar..."
            startContent={
              <Icon
                icon="solar:minimalistic-magnifer-outline"
                className="text-xl"
              />
            }
          />
          <Tooltip content="Agregar">
            <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
              <Icon
                icon="solar:add-circle-bold"
                className="text-5xl text-blue-500 bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500"
              />
            </span>
          </Tooltip>
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="grid w-full grid-cols-2 py-3 text-sm text-center bg-gray-100 rounded-lg md:grid-cols-3 lg:grid-cols-5">
          <div>Nombre</div>
          <div>Empresa</div>
          <div>Posición</div>
          <div>Telefóno</div>
          <div>Acciones</div>
        </div>
        {currentPosts.map((item, index) => (
          <div
            key={index}
            className="grid w-full grid-cols-2 py-3 text-sm text-center rounded-lg bg-gray-50 md:grid-cols-3 lg:grid-cols-5"
          >
            <div className="flex items-center justify-center w-full">
              {item.name}
            </div>
            <div className="flex items-center justify-center w-full">
              {item.company}
            </div>
            <div className="flex items-center justify-center w-full">
              {item.position}
            </div>
            <div className="flex items-center justify-center w-full">
              {item.phone}
            </div>
            <div className="relative flex items-center justify-center gap-2">
              <Tooltip content="Editar">
                <span className="text-lg cursor-pointer text-default-400 active:opacity-50">
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Eliminar">
                <span className="text-lg cursor-pointer text-danger active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          </div>
        ))}
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      <CardFooter className="justify-end gap-2 mt-4">
        <Pagination
          loop
          showControls
          total={pageNumbers}
          initialPage={1}
          classNames={{
            cursor:
              "bg-gradient-to-r from-blue-600 to-sky-500 text-white font-semibold",
          }}
          onChange={(page) => setCurrentPage(page)}
        />
      </CardFooter>
    </Card>
  );
}