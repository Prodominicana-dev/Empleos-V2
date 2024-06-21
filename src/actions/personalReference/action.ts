import {
  createPersonalReference,
  deletePersonalReference,
  editPersonalReference,
} from "@/service/personalReference/service";

export const createPersonalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, relationship, phone } = Object.fromEntries(formData);
  const data = {
    userId: id,
    name,
    relationship,
    phone,
  };
  try {
    const response = await createPersonalReference(data);
    update();
    handler();
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updatePersonalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, relationship, phone } = Object.fromEntries(formData);
  const data = {
    name,
    relationship,
    phone,
  };
  try {
    await editPersonalReference(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deletePersonalReferenceAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deletePersonalReference(id, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};
