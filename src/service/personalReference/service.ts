import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function usePersonalReference(id: string) {
  return useQuery({
    queryKey: ["language", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/personal-reference/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createPersonalReference(perReference: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/personal-reference/`;
    const response = await axios.post(url, perReference);
    if (response.status === 201) {
      toast.success("Referencia personal registrada correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al registrar la referencia personal", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editPersonalReference(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/personal-reference/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Referencia personal actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar esta referencia personal", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deletePersonalReference(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/personal-reference/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Referencia personal eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta referencia personal", {
      duration: 4000,
      position: "top-center",
    });
  }
}
