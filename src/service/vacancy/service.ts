import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useVacancy() {
  return useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useVacancyById(id: string) {
  return useQuery({
    queryKey: ["vacancyById", id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/${id}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}

export function useUserApplyVacancy(id: string, userId: string) {
  return useQuery({
    queryKey: ["userApplyVacancy"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/vacancy/${id}/apply/${userId}`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}
