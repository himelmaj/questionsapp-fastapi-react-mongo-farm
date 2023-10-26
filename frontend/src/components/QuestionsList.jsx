import { useEffect, useState } from "react";
import { getAllQuestions } from "../api/questions.api";
import { QuestionCard } from "./QuestionCard";
import { toast } from "react-hot-toast";
export function QuestionsList() {
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    async function loadQuestions() {
      const res = await getAllQuestions();
      setQuestions(res.data.data.flat());
    }
    toast.promise(
      loadQuestions(),
       {
         loading: 'Loading questions...',
         success: <b>Questions loaded</b>,
         error: <b>Questions not loaded.</b>,
       }
    );
  }, []);

  return (
    <main className="grid md:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-3 mx-3">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question}/>
      ))}
    </main>
  );
}
