import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useProfessionalReference(id: string) {
  return useQuery({
    queryKey: ["professional-reference", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/professional-reference/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createProfessionalReference(perReference: any) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/professional-reference/`;
    const response = await axios.post(url, perReference);
    if (response.status === 201) {
      toast.success("Referencia profesional registrada correctamente", {
        duration: 4000,
        position: "top-center",
      });
    }
  } catch (e) {
    toast.error("Error al registrar la referencia profesional", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editProfessionalReference(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/professional-reference/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Referencia profesional actualizada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar esta referencia profesional", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deleteProfessionalReference(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/professional-reference/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Referencia profesional eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar esta referencia profesional", {
      duration: 4000,
      position: "top-center",
    });
  }
}
