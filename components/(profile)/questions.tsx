"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardFooter,
  ChipProps,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Input,
} from "@nextui-org/react";
import { editUser, useUser } from "@/service/user/service";
import UserDataSkeleton from "./skeleton/user-profile";
import { useQuestion } from "@/service/question/service";
import { createEducationAction } from "@/actions/education/actions";
import { createAnswerAction } from "@/actions/question/action";

export default function QuestionData({
  user,
  update,
}: {
  user: any;
  update: () => void;
}) {
  const { data: answers, isLoading } = useQuestion();
  useEffect(() => {
    if (answers && !isLoading) {
      console.log(answers);
    }
  }, [answers, isLoading]);
  return (
    <div className="flex flex-col gap-5">
      <Card className="w-full p-2">
        <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 text-black md:flex-row md:justify-between">
          <p className="font-bold text-large">Preguntas</p>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {answers?.map((question: any) => {
          let options: {
            label: string;
            value: string;
          }[] = [];

          // Convertir, en caso que exista options, a un array de objetos: {label: string, value: string}
          if (question.options && question.options.length > 0) {
            options = question.options.map((option: any) => ({
              label: option.option,
              value: option.id,
            }));
          }
          const userIdLogged = localStorage.getItem("userId");
          const createAnswerWithId = createAnswerAction.bind(
            null,
            userIdLogged as string,
            update,
            () => {}
          );

          return (
            <Card className="w-full p-2">
              <CardHeader className="flex flex-col items-center px-4 pt-4 pb-5 md:flex-row md:justify-between">
                <p className="font-bold text-large font-dm-sans">
                  {question.question}
                </p>
              </CardHeader>
              <form action={createAnswerWithId}>
                <CardBody className="flex flex-col gap-2">
                  <Input
                    className="hidden"
                    name="questionId"
                    value={question.id}
                  />
                  {question.type === "text" && (
                    <Textarea
                      minRows={2}
                      name="answer"
                      placeholder="Escribe tu respuesta"
                    />
                  )}
                  {question.type === "select" && (
                    <>
                      {/* <Input className="hidden" value={answer} />
                      <Input className="hidden" value={answerId} />
                      <Autocomplete
                        defaultItems={options}
                        label="Respuesta"
                        placeholder="Elija su respuesta"
                        className="w-full"
                        onSelectionChange={(e: any) => {
                          setAnswerId(e);
                          setAnswer(
                            options.find((option) => option.value === e)
                              ?.label || ""
                          );
                        }}
                      >
                        {(option) => (
                          <AutocompleteItem key={option.value}>
                            {option.label}
                          </AutocompleteItem>
                        )}
                      </Autocomplete> */}
                    </>
                  )}
                </CardBody>

                {/* Validar si algo del cuerpo user cambio con relacion a la data, en caso de cambiar mostrar el Button de Save Changes */}

                <CardFooter className="justify-end gap-2 mt-4">
                  <Button
                    variant="flat"
                    onClick={() => {}}
                    disabled={false}
                    radius="full"
                    type="submit"
                    className="text-white bg-gradient-to-r from-blue-600 to-sky-500"
                  >
                    Guardar Respuesta
                  </Button>
                </CardFooter>
              </form>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
