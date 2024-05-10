import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useExperience(id: string) {
  return useQuery({
    queryKey: ["work-experience", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/work-experience/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createExperience(experience: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/work-experience/`;
    const response = await axios.post(url, experience);
    if (response.status === 201) {
      toast.success("Experiencia laboral registrada correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al registrar su experiencia laboral.", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editExperience(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/work-experience/${id}`;
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

export async function deleteExperience(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/work-experience/${id}`;
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
