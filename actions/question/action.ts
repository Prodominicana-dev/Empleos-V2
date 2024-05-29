import {
  createEducation,
  deleteEducation,
  editEducation,
} from "@/service/education/service";
import { createAnswer } from "@/service/question/service";

export const createAnswerAction = async (
  id: string,
  handler: () => void,
  update: () => void,
  formData: FormData
) => {
  // Organizar la data
  const { questionId, answer, answerId } = Object.fromEntries(formData);
  const data: any = {
    userId: id,
    questionId,
    answer: {
      answer,
    },
  };
  if (answerId) {
    data.answer.answerId = answerId;
  }
  console.log(data);

  //   try {
  //     await createAnswer(data);
  //     update();
  //     handler();
  //     return { success: true };
  //   } catch (error: any) {
  //     return { error: error.message };
  //   }
};

export const updateQuestionAction = async (
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
  console.log(data);

  try {
    //await editQuestion(id, data, handler, update);
    return { success: true };
  } catch (error: any) {
    console.log(error.message);
    return { error: error.message };
  }
};

export const deleteQuestionAction = async (
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
