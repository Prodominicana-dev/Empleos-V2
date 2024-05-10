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
import LanguageCard from "./language/card";
import LanguageDialog from "./language/dialog";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Si: "success",
  No: "danger",
};

export default function LanguageData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const [languages, setLanguages] = useState<any>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    console.log(user);
    setLanguages(user.language);
  }, [user]);

  // Pagination with testData
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = languages.slice(indexOfFirstPost, indexOfLastPost);

  // Cantidad de paginas
  const pageNumbers = languages.length / postsPerPage;

  return (
    <Card className="w-full p-2">
      <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
        <p className="font-bold text-large">Idiomas</p>
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
          <LanguageDialog
            id={user.id}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            update={update}
            key={"create-language"}
          />
        </div>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        <div className="grid w-full grid-cols-2 py-3 text-sm text-center bg-gray-100 rounded-lg md:grid-cols-3">
          <div>Idioma</div>
          <div>Nivel</div>
          <div>Acciones</div>
        </div>
        {currentPosts.map((item: any, index: number) => (
          <LanguageCard key={item.id} update={update} language={item} />
        ))}
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
