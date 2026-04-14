type MyProps = {
  goBack: () => void;
  goHome: () => void;
};
export const RestartQuiz = ({ goBack, goHome }: MyProps) => {
  return (
    <div className="w-full h-full fixed z-50 top-0 left-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
      <div className="w-[450px] h-[170px] rounded-lg bg-white flex flex-col p-6 justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-[24px] text-black font-semibold">Are you sure?</p>
          <p className="text-[#B91C1C] text-[14px] font-normal">
            If you press 'Cancel', this quiz will end
          </p>
        </div>
        <div className="flex justify-between">
          <button
            className="w-[170px] h-10 bg-black rounded-lg cursor-pointer flex items-center justify-center font-medium text-[14px] text-white"
            onClick={goBack}
          >
            Go back
          </button>
          <button
            className="w-[170px] h-10 border border-zinc-200 rounded-lg cursor-pointer flex items-center justify-center font-medium text-[14px] text-black"
            onClick={goHome}
          >
            Cancel quiz
          </button>
        </div>
      </div>
    </div>
  );
};
