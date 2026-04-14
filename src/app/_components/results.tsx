import { RightIcon } from "../_icons/rightIcon";
import { WrongIcon } from "../_icons/wrongIcon";

type MyProps = {
  data: Data;
  quesNumber: number;
};

type Data = {
  question: string;
  yourAnswer: string;
  correctAnswer: string;
  correct: boolean;
};

export const Results = ({ data, quesNumber }: MyProps) => {
  return (
    <div className="w-full flex gap-3">
      <div className="w-fit h-fit shrink-0">
        {data.correct === true ? <RightIcon /> : <WrongIcon />}
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="text-[12px] text-zinc-400 font-medium">
          {quesNumber}. {data.question}
        </p>
        <p className="text-[12px] text-black font-medium">
          {data.correct === true ? (
            <>Your answer: {data.correctAnswer}</>
          ) : (
            <>Your answer: {data.yourAnswer}</>
          )}
        </p>
        <p className={`text-[12px] text-green-400 font-medium`}>
          {data.correct === true ? "" : <>Correct: {data.correctAnswer}</>}
        </p>
      </div>
    </div>
  );
};
