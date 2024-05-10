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
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import countries from "./countries";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";

import { EyeIcon } from "@/components/icons/eye-icon";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import test from "node:test";
import RelationshipDialog from "./relationship/dialog";
import RelationshipCard from "./relationship/card";

export default function RelationshipData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [relationship, setRelationship] = useState<any>([]);

  useEffect(() => {
    setRelationship(user.relationship);
  }, [user]);

  // Pagination with testData
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = relationship.slice(indexOfFirstPost, indexOfLastPost);

  // Cantidad de paginas
  const pageNumbers = relationship.length / postsPerPage;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
        <p className="font-bold text-large">Relaciones familiares</p>
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
            <span
              onClick={onOpen}
              className="text-lg cursor-pointer text-default-400 active:opacity-50"
            >
              <Icon
                icon="solar:add-circle-bold"
                className="text-5xl text-blue-500 bg-clip-text bg-gradient-to-r from-blue-500 to-sky-500"
              />
            </span>
          </Tooltip>
        </div>
        <RelationshipDialog
          key={user.id}
          id={user.id}
          update={update}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="grid w-full grid-cols-2 py-3 text-sm text-center bg-gray-100 rounded-lg md:grid-cols-3 lg:grid-cols-5">
          <div>Nombre</div>
          <div>Relación</div>
          <div>Teléfono</div>
          <div>¿Trabaja en la empresa?</div>
          <div>Acciones</div>
        </div>
        {currentPosts.map(
          (
            item: {
              id: string;
              name: string;
              relationship: string;
              phone: string;
              isInTheCompany: boolean;
            },
            index: number
          ) => (
            <RelationshipCard relation={item} update={update} key={item.id} />
          )
        )}
      </CardBody>

      {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

      {pageNumbers > 1 && (
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
      )}
    </Card>
  );
}
