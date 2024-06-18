import axios from "axios";
import toast from "react-hot-toast";

export async function addCV(user: any, update: () => void) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/cv/`;
    const response = await axios.post(url, user);
    if (response.status === 201) {
      toast.success("CV registrado correctamente", {
        duration: 4000,
        position: "top-center",
      });
      update();
    }
    return response;
  } catch (e) {
    toast.error("Error al registrar el CV", {
      duration: 4000,
      position: "top-center",
    });
  }
}
