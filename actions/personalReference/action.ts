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
  console.log(data);

  try {
    const response = await createPersonalReference(data);
    update();
    handler();
    console.log(response);
    return { success: true };
  } catch (error: any) {
    console.log(error);
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
  console.log(data);

  try {
    await editPersonalReference(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
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
    console.log(error.message);
    return { error: error.message };
  }
};
