import { useState, useEffect } from "react";
import { getAllQuestions } from "../api/questions.api";
import arrayShuffle from "array-shuffle";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { QuestionPlayCard } from "../components/QuestionPlayCard";


export function Lobby() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [primeraPregunta, setPrimeraPregunta] = useState(0);
    const [segundaPregunta, setSegundaPregunta] = useState(1);
    const [questions, setQuestions] = useState([]);
    
    useEffect(() => {
      async function loadQuestions() {
        const res = await getAllQuestions();
        const resFormatted = res.data.data.flat();
        if (resFormatted.length % 2 !== 0) resFormatted.pop();
        const shuffledQuestions = arrayShuffle(resFormatted);
        setQuestions(shuffledQuestions);
      }
      toast.promise(loadQuestions(), {
        loading: "Loading questions...",
        success: <b>Questions loaded</b>,
        error: <b>Questions not loaded.</b>,
        position: "bottom-right",
      });
    }, []);
  
    const onSubmit = handleSubmit((data) => {
      if (
        data.answer1 === questions[primeraPregunta].correct_answer &&
        data.answer2 === questions[segundaPregunta].correct_answer
      ) {
        toast("Has acertado", {
          icon: "😎",
          duration: 2000,
        });
        if (segundaPregunta === questions.length - 1) {
          toast("Has finalizado el test!", {
            icon: "👏",
          });
      
          setTimeout(() => {
            navigate("/questionpage");
          }, 2000)      } else {
          setTimeout(() => {
            setPrimeraPregunta(primeraPregunta + 2);
            setSegundaPregunta(segundaPregunta + 2);
          }, 2000);
        }
      } else {
        toast("Has fallado", {
          icon: "🤢",
          duration: 3000,
        });
      }
    });
  
    return (
      <main className="max-w-4xl mx-auto mt-20">
        <form className="bg-zinc-900 p-10 rounded-md" onSubmit={onSubmit}>
          {questions.length > 0 ? (
            <div>
            <QuestionPlayCard questions={questions} answerNumber={primeraPregunta} answerId={"answer1"} register={register}/>
            <QuestionPlayCard questions={questions} answerNumber={segundaPregunta} answerId={"answer2"} register={register}/>
            </div>
          ) : null}
          <button
            type="submit"
            className="bg-gray-500 px-3 w-40 py-2 rounded-md inline-block hover:bg-gray-600 hover:cursor-pointer text-zinc-950 font-bold text-center"
          >
            Comprobar
          </button>
        </form>
      </main>
    );
}