import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useRelationship(auth0Id: string) {
  return useQuery({
    queryKey: ["relationshipByAuth0Id"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/relationship/a/${auth0Id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export async function createRelationship(
  relation: any,
  update: () => void,
  handler: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/relationship/`;
    const response = await axios.post(url, relation);
    if (response.status === 201) {
      toast.success("Relación registrada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      update();
      handler();
    }
  } catch (e) {
    toast.error("Error al registrar esta relación. Inténtelo de nuevo.", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function editUser(
  id: string,
  data: any,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/user/${id}`;
    const response = await axios.patch(url, data);
    if (response.status === 200) {
      toast.success("Perfíl actualizado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al actualizar el perfíl", {
      duration: 4000,
      position: "top-center",
    });
  }
}

export async function deleteQuestion(
  id: string,
  handler: () => void,
  update: () => void
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/question/${id}`;
    const response = await axios.delete(url);
    if (response.status === 200) {
      toast.success("Pregunta eliminada correctamente", {
        duration: 4000,
        position: "top-center",
      });
      handler();
      update();
    }
  } catch (error) {
    toast.error("Error al eliminar la pregunta", {
      duration: 4000,
      position: "top-center",
    });
  }
}
