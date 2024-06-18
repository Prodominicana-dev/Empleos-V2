import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/category/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}
