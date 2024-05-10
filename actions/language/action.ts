import {
  createEducation,
  deleteEducation,
  editEducation,
} from "@/service/education/service";
import {
  createExperience,
  deleteExperience,
  editExperience,
} from "@/service/experience/service";
import {
  createLanguage,
  deleteLanguage,
  editLanguage,
} from "@/service/language/service";

export const createLanguageAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, level } = Object.fromEntries(formData);
  const data = {
    userId: id,
    name,
    level,
  };
  console.log(data);

  try {
    const response = await createLanguage(data);
    update();
    handler();
    console.log(response);
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};

export const updateLanguageAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { name, level } = Object.fromEntries(formData);
  const data = {
    name,
    level,
  };
  console.log(data);

  try {
    await editLanguage(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};

export const deleteLanguageAction = async (
  id: string,
  handler: () => void,
  update: () => void
) => {
  try {
    await deleteLanguage(id, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};
