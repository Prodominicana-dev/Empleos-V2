import {
  createRelationship,
  deleteRelationship,
  editRelationship,
} from "@/service/relationship/service";

export const createRelationshipAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, relationship, phone, isInTheCompany } =
    Object.fromEntries(formData);
  const data = {
    userId: id,
    name,
    relationship,
    phone,
    isInTheCompany: isInTheCompany === "true",
  };
  try {
    await createRelationship(data);
    update();
    handler();
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateRelationshipAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, relationship, phone, isInTheCompany } =
    Object.fromEntries(formData);
  const data = {
    name,
    relationship,
    phone,
    isInTheCompany: isInTheCompany === "true",
  };

  try {
    await editRelationship(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteRelationshipAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteRelationship(id, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};
