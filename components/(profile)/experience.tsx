"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Chip,
  Tooltip,
  ChipProps,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";
import countries from "./countries";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";

import { EyeIcon } from "@/components/icons/eye-icon";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import test from "node:test";
import Education from "../icons/education";
import EducationCard from "./education/card";
import ExperienceCard from "./experience/card";

const statusColorMap: Record<string, ChipProps["color"]> = {
  Si: "success",
  No: "danger",
};

export default function ExperienceData({ id }: { id: string }) {
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
      id: "1",
      position: "Programador",
      company: "ProDominicana",
      area: "TI",
      startDate: "2023-07-05",
    },
    {
      id: "2",
      position: "Desarrollador Pasante",
      company: "OGTIC",
      area: "TI",
      startDate: "2022-08-01",
      endDate: "2022-09-01",
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
          <div>
            <p className="font-bold text-large">Experiencia</p>
            <p className="text-small">Registra toda tu experiencia laboral.</p>
          </div>
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
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testData.map((experience) => (
          <ExperienceCard experience={experience} key={experience.id} />
        ))}
      </div>
    </div>
  );
}