import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createQuestion, deleteQuestion, updateQuestion, getQuestion } from "../api/questions.api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export function Questionform() {
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    const dataFormat = {
      answers: [data.answer1, data.answer2, data.answer3, data.answer4],
      correct_answer: data.correct_answer,
      question_title: data.question_title,
    };
    if (params.id) {
      await updateQuestion(params.id, dataFormat);
      toast.success("La pregunta se actualizo correctamente", {
        position: "bottom-right",
      });
    } else {
      await createQuestion(dataFormat);
      toast.success("La pregunta se creo correctamente", {
        position: "bottom-right",
      });
    }
    navigate("/questionpage");
  });

  useEffect(() => {
    async function loadQuestion() {
      if (params.id) {
        const res = await getQuestion(params.id);
        const resFormat = res.data.data.shift();
        setValue("question_title", resFormat.question_title);
        for (let index = 0; index < resFormat.answers.length; index++)
          setValue(`answer${index + 1}`, resFormat.answers[index]);
        setValue("correct_answer", resFormat.correct_answer);
      }
    }
    params.id ? toast.promise(loadQuestion(), {
      loading: "Loading questions...",
      success: <b>Questions loaded</b>,
      error: <b>Questions not loaded.</b>,
    }) : loadQuestion()

  }, []);
  return (
    <div className="max-w-3xl mx-auto mt-20">
      <form className="bg-zinc-900 p-10 rounded-md" onSubmit={onSubmit}>
        <h1 className="text-2xl font-bold pb-3 mb-2 text-center">
          {"Question Form"}
        </h1>
        <input
          type={"text"}
          placeholder={"Question title"}
          className="input-form"
          {...register("question_title", { required: true })}
        />
        <input
          type={"text"}
          placeholder={"Answer 1"}
          className="input-form"
          {...register("answer1", { required: true })}
        />
        <input
          type={"text"}
          placeholder={"Answer 2"}
          className="input-form"
          {...register("answer2", { required: true })}
        />
        <input
          type={"text"}
          placeholder={"Answer 3"}
          className="input-form"
          {...register("answer3", { required: true })}
        />
        <input
          type={"text"}
          placeholder={"Answer 4"}
          className="input-form"
          {...register("answer4", { required: true })}
        />
        <input
          type={"text"}
          placeholder={"Correct Answer"}
          className="input-form"
          {...register("correct_answer", { required: true })}
        />
        <button className="bg-green-500 hover:bg-green-600 hover:cursor-pointer p-3 rounded-md block w-full mt-3 text-zinc-950 font-bold">
          {"Save"}
        </button>
      </form>
      <div className="flex justify-end">
        {params.id && (
          <button
            className="bg-red-300 hover:bg-red-400 hover:cursor-pointer text-zinc-950 font-bold p-3 rounded-md w-48 mt-3"
            onClick={async () => {
              const accepted = window.confirm(
                "Estas seguro de eliminar la pregunta?"
              );
              if (accepted) {
                await deleteQuestion(params.id);
                toast.success("La pregunta elimino correctamente", {
                  position: "bottom-right",
                });
                navigate("/questionpage");
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
