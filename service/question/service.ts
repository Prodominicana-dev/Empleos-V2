import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useAnswerByUserId(id: string) {
  return useQuery({
    queryKey: ["answer-by-userId", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/answer/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useQuestion() {
  return useQuery({
    queryKey: ["question"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/question`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createAnswer(answer: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/answer/`;
    const response = await axios.post(url, answer);
    if (response.status === 201) {
      toast.success("Respuesta registrada correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al registrar tu respuesta", {
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
