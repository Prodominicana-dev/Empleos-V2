import {
  createEducation,
  deleteEducation,
  editEducation,
} from "@/service/education/service";

export const createEducationAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { title, institution, degreeId, startDate, endDate, area, careerId } =
    Object.fromEntries(formData);
  const data = {
    userId: id,
    title,
    institution,
    area,
    degreeId,
    careerId,
    startDate: new Date(startDate as string).toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };

  try {
    await createEducation(data);
    update();
    handler();
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const updateEducationAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { title, institution, degreeId, startDate, endDate, area, careerId } =
    Object.fromEntries(formData);
  const data = {
    title,
    institution,
    area,
    degreeId,
    careerId,
    startDate: new Date(startDate as string).toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };

  try {
    await editEducation(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteEducationAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteEducation(id, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};
