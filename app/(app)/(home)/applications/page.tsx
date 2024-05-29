"use client";
import Loading from "@/components/loading";
import { useApplicationsByUserId } from "@/service/application/service";
import { BreadcrumbItem, Breadcrumbs, Input, Tooltip } from "@nextui-org/react";
import React, { useEffect } from "react";

export default function Page() {
  const userIdLogged = localStorage.getItem("userId");
  const { data, isLoading } = useApplicationsByUserId(userIdLogged as string);
  const [search, setSearch] = React.useState("");
  const [applications, setApplications] = React.useState([]);

  useEffect(() => {
    if (data) {
      setApplications(data);
    }
  }, [data, isLoading]);

  useEffect(() => {
    handleSearch();
  }, [search]);

  const breadcrumbsItems = [
    { href: "/", label: "Inicio" },
    { href: "/applications", label: "Aplicaciones" },
  ];

  const handleSearch = () => {
    if (search === "") {
      setApplications(data);
    } else {
      const filteredApplications = data.filter((application: any) => {
        return application.vacancy.title
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      setApplications(filteredApplications);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center w-full min-h-[85vh]">
      <div className="flex justify-center w-full bg-blue-950 min-h-10">
        <div className="flex flex-col w-full max-w-5xl gap-2 px-10 py-6 lg:px-4">
          <Breadcrumbs>
            {breadcrumbsItems.map((item, index) => (
              <BreadcrumbItem
                classNames={{
                  item: "text-white font-dm-sans text-xs",
                  separator: "text-white font-dm-sans text-xs",
                }}
                href={item?.href}
                key={index}
              >
                {item?.label}
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
          <div className="flex items-center justify-between w-full">
            <h1 className="text-6xl font-bold text-white font-dm-sans">
              Aplicaciones
            </h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-5xl gap-5 px-10 py-10 lg:px-5">
        <div className="flex justify-end w-full">
          <Input
            placeholder="Buscar por vacante..."
            className="w-64"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {applications?.length > 0 ? (
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 px-4 py-5 text-center bg-gray-200 lg:grid-cols-3 rounded-xl">
              <div className="font-bold text-black font-dm-sans">Vacante</div>
              <div className="font-bold text-black font-dm-sans">Estado</div>
              <div className="font-bold text-black font-dm-sans">
                Fecha de aplicación
              </div>
            </div>
            {applications?.map((application: any, index: number) => (
              <div className="grid grid-cols-2 px-4 py-5 text-center lg:grid-cols-3 rounded-xl">
                <div className="font-medium text-black font-dm-sans line-clamp-1">
                  <Tooltip content={application.vacancy.title}>
                    {application.vacancy.title}
                  </Tooltip>
                </div>
                <div className="font-medium text-black font-dm-sans ">
                  <span className="px-4 py-2 bg-warning rounded-2xl">
                    {application.status === "pending"
                      ? "Pendiente"
                      : application.status === "approved"
                      ? "Aprobado"
                      : "Rechazado"}
                  </span>
                </div>
                <div className="font-medium text-black font-dm-sans">
                  {new Date(application.createdAt).toLocaleDateString("es-Es", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center w-full">
            <h1 className="text-2xl font-bold text-black font-dm-sans">
              No tienes aplicaciones...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
