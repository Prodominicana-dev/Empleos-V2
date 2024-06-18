import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function useCareers() {
  return useQuery({
    queryKey: ["vacancy-carriers"],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/carriers/`;
      const { data } = await axios.get(url);
      return data;
    },
  });
}
