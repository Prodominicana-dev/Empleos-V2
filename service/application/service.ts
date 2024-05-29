import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useEducation(id: string) {
  return useQuery({
    queryKey: ["education", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/education/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createApplication(application: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/application/`;
    const response = await axios.post(url, application);
    if (response.status === 201) {
      toast.success("¡Has aplicado con éxito a esta vacante!", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al aplicar a esta vacante.", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editEducation(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/education/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Registro académico actualizado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar este registro académico", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deleteEducation(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/education/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Registro académico eliminado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar este registro académico", {
      duration: 4000,
      position: "top-center",
    });
  }
}
