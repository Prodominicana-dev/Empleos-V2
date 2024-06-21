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
    level: parseInt(level as string),
  };
  try {
    const response = await createLanguage(data);
    update();
    handler();
    return { success: true };
  } catch (error: any) {
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
    level: parseInt(level as string),
  };
  try {
    await editLanguage(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
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
    return { error: error.message };
  }
};
