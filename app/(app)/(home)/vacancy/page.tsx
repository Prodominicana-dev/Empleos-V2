"use client";
import { Category } from "@/components/(home)/categories";
import { useCategories } from "@/service/vacancy/category/service";
import React, { useEffect, useState } from "react";
import { CheckboxGroup, Checkbox, Pagination } from "@nextui-org/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useVacancy } from "@/service/vacancy/service";

const vacancy = [
  {
    name: "Programador TI",
    category: "Consultoría Jurídica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "12 Junio 2024",
    cv: 5,
  },
  {
    name: "Programador TI",
    category: "Consultoría Jurídica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "12 Junio 2024",
    cv: 5,
  },
  {
    name: "Programador TI",
    category: "Consultoría Jurídica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "12 Junio 2024",
    cv: 5,
  },
  {
    name: "Programador TI",
    category: "Consultoría Jurídica",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "12 Junio 2024",
    cv: 5,
  },
  {
    name: "Encargado TI",
    category: "Dirección Ejecutiva",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "18 Junio 2024",
    cv: 2,
  },
  {
    name: "Encargado TI",
    category: "Dirección Ejecutiva",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "18 Junio 2024",
    cv: 2,
  },
  {
    name: "Encargado TI",
    category: "Dirección Ejecutiva",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "18 Junio 2024",
    cv: 2,
  },
  {
    name: "Encargado TI",
    category: "Dirección Ejecutiva",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget risus in sapien.",
    date: "18 Junio 2024",
    cv: 2,
  },
];

export default function Page() {
  const { data, isLoading } = useCategories();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selected, setSelected] = React.useState([] as string[]);
  const router = useRouter();
  const { replace } = router;
  const searchParameters = useSearchParams();
  const pathname = usePathname();
  const { data: vacancies, isLoading: loadingVacancies } = useVacancy();

  const filterVacancy = (vacancy: any[], selected: string[]) => {
    if (selected.length === 0) return vacancy;
    return vacancy.filter((item) =>
      selected.includes(item.category.toLowerCase())
    );
  };

  // const vacancyFilter = filterVacancy(vacancies, selected) || vacancies;

  // // Paginacion de vacantes de 4 en 4
  // // Pagination with testData
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage] = useState(4);

  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentVacancy = vacancyFilter.slice(indexOfFirstPost, indexOfLastPost);

  // // Cantidad de paginas
  // const pageNumbers = vacancyFilter.length / postsPerPage;

  const handleCategories = () => {
    const parameters = new URLSearchParams(searchParameters);
    const selectedCategories = selected.join(",");
    parameters.set("cat", selectedCategories);
    if (selected.length === 0) {
      parameters.delete("cat");
      return replace(pathname);
    }
    replace(`${pathname}?${parameters.toString()}`);
  };

  useEffect(() => {
    console.log(selected);
    handleCategories();
  }, [selected]);

  useEffect(() => {
    // Sacar de la ruta los parametros de busqueda, en caso de tener y asignar al select
    const parameters = new URLSearchParams(searchParameters);
    const categories = parameters.get("cat");
    if (categories) {
      setSelected(categories.split(","));
    }
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      console.log(data);
      setCategories(data);
    }
  }, [data, isLoading]);

  if (loadingVacancies) return <div>Cargando...</div>;
  console.log(vacancies);

  return (
    <div className="w-full min-h-[90vh] flex justify-center">
      <div className="flex flex-col w-full gap-5 p-10 lg:p-10 max-w-7xl">
        <div className="w-full p-4 border border-gray-300 shadow rounded-xl">
          <h1 className="text-5xl font-bold leading-tight text-black font-dm-sans">
            Vacantes disponibles
          </h1>
        </div>
        <div className="flex flex-col w-full gap-5 lg:flex-row">
          <div className="flex flex-col w-5/12 px-4 py-8 rounded-xl bg-blue-950">
            <h1 className="text-2xl font-bold text-white font-dm-sans">
              Categorías
            </h1>
            <div className="w-full h-[1px] bg-gray-100/40 my-4"></div>
            <CheckboxGroup value={selected} onValueChange={setSelected}>
              {categories.map((category) => (
                <Checkbox
                  classNames={{
                    label: "text-white font-dm-sans font-medium",
                  }}
                  key={category.id}
                  value={category.name.toLowerCase()}
                >
                  {category.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </div>
          <div className="grid w-full h-full grid-cols-1 gap-5 md:grid-cols-2">
            {vacancies.map((item: any, index: number) => {
              const date = new Date(item?.createdAt);
              // Formatear la fecha con toLocaleDateString
              console.log(date);

              const fechaFormateada = date.toLocaleDateString("es-ES", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });
              console.log(fechaFormateada);

              return (
                <Link
                  key={index}
                  href={`/vacancy/${item.id}`}
                  className="flex flex-col w-full gap-4 p-4 border border-gray-300 shadow rounded-xl h-[30vh] justify-center hover:bg-gray-100 duration-200 hover:cursor-pointer"
                >
                  <h2 className="text-2xl font-semibold text-black font-dm-sans line-clamp-1">
                    {item.title}
                  </h2>
                  <div className="w-full h-[1px] bg-gray-100"></div>
                  <p className="text-sm text-gray-500 font-dm-sans">
                    {item?.category.name}
                  </p>

                  <div className="w-full h-[1px] bg-gray-100"></div>
                  <p className="text-sm text-gray-500 font-dm-sans line-clamp-2">
                    {item.description}
                  </p>
                  <div className="w-full h-[1px] bg-gray-100"></div>
                  <div className="flex flex-row justify-between">
                    <p className="text-sm text-gray-500 font-dm-sans">
                      CV enviados: {item?._count.applications}
                    </p>
                    <p className="text-sm text-gray-500 font-dm-sans">
                      {fechaFormateada}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* {pageNumbers > 1 && (
          <div className="flex justify-end w-full gap-2 mt-4">
            <Pagination
              loop
              showControls
              total={pageNumbers}
              initialPage={1}
              classNames={{
                cursor: "bg-blue-950 font-dm-sans text-white font-semibold",
              }}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
