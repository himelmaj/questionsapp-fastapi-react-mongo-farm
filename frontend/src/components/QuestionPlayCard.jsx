import arrayShuffle from "array-shuffle";

export function QuestionPlayCard({ questions, answerNumber, answerId , register}) {

  return (
    <div key={questions[answerNumber].id} className="my-5">
      <h3 className="font-bold text-lg">{questions[answerNumber].question_title}</h3>
      {arrayShuffle(questions[answerNumber].answers).map((answer) => (
        <label key={answer} className="block">
          <input
            type="radio"
            value={answer}
            name={questions[answerNumber].id}
            {...register(answerId, { required: true })}
          />
          {` ${answer} `}
        </label>
      ))}
    </div>
  );
}
