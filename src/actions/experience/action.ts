import {
  createExperience,
  deleteExperience,
  editExperience,
} from "@/service/experience/service";

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
    startDate: startDate
      ? new Date(startDate as string).toISOString()
      : new Date().toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };

  try {
    const response = await createExperience(data);
    update();
    handler();
    return { success: true };
  } catch (error: any) {
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
    startDate: startDate
      ? new Date(startDate as string).toISOString()
      : new Date().toISOString(),
    endDate: endDate ? new Date(endDate as string).toISOString() : null,
  };
  try {
    await editExperience(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const deleteExperienceAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteExperience(id, handler, update);
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};
