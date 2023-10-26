import { useNavigate } from "react-router-dom";

export function QuestionCard({ question }) {
  const navigate = useNavigate();
  return (
    <article
      className="bg-zinc-800 p-3 hover:bg-zinc-700 hover:cursor-pointer rounded-lg"
      onClick={() => {
        navigate(`/question/${question.id}`);
      }}
    >
      <h1 className="text-xl font-bold">{question.question_title}</h1>
      <ul className="list-disc px-5">
        {question.answers.map((answer) => (
          <li key={answer}>{answer}</li>
        ))}
      </ul>
      <p>Respuesta correcta: <b className="font-bold" >{question.correct_answer}</b> </p>
    </article>
  );
}
