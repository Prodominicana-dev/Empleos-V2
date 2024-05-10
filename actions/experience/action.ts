import {
  createEducation,
  deleteEducation,
  editEducation,
} from "@/service/education/service";
import { createExperience, editExperience } from "@/service/experience/service";

export const createExperienceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const {
    company,
    position,
    currency,
    salary,
    area,
    supervisor,
    phone,
    industry,
    startDate,
    endDate,
    functions,
  } = Object.fromEntries(formData);
  const data = {
    userId: id,
    company,
    position,
    currency,
    salary,
    area,
    supervisor,
    phone,
    industry,
    functions,
    startDate: new Date(startDate as string).toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };
  console.log(data);

  try {
    const response = await createExperience(data);
    update();
    handler();
    console.log(response);
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const updateExperienceAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const {
    company,
    position,
    currency,
    salary,
    area,
    supervisor,
    phone,
    industry,
    startDate,
    endDate,
    functions,
  } = Object.fromEntries(formData);
  const data = {
    company,
    position,
    currency,
    salary,
    area,
    supervisor,
    phone,
    industry,
    functions,
    startDate: new Date(startDate as string).toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };
  console.log(data);

  try {
    await editExperience(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};

export const deleteExperienceAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteEducation(id, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};
