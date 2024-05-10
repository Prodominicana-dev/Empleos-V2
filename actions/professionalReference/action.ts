import {
  createPersonalReference,
  deletePersonalReference,
  editPersonalReference,
} from "@/service/personalReference/service";
import {
  createProfessionalReference,
  deleteProfessionalReference,
  editProfessionalReference,
} from "@/service/professionalReference/service";

export const createProfessionalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, company, position, phone } = Object.fromEntries(formData);
  const data = {
    userId: id,
    name,
    company,
    position,
    phone,
  };
  console.log(data);

  try {
    const response = await createProfessionalReference(data);
    update();
    handler();
    console.log(response);
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const updateProfessionalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, company, position, phone } = Object.fromEntries(formData);
  const data = {
    name,
    company,
    position,
    phone,
  };
  console.log(data);

  try {
    await editProfessionalReference(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};

export const deleteProfessionalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteProfessionalReference(id, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};
