import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLanguage(id: string) {
  return useQuery({
    queryKey: ["language", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/language/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createLanguage(language: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/language/`;
    const response = await axios.post(url, language);
    if (response.status === 201) {
      toast.success("Idioma registrado correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al registrar el idioma", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editLanguage(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/language/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Idioma actualizado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar este idioma", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deleteLanguage(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/language/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Idioma eliminado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar este idioma", {
      duration: 4000,
      position: "top-center",
    });
  }
}
