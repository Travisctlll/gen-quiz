import { TitleIcon } from "../_icons/titleIcon";

type MyProps = {
  title: string;
};

export const Title = ({ title }: MyProps) => {
  return (
    <p className="flex items-center text-black text-[24px] font-semibold gap-2">
      <TitleIcon /> {title}
    </p>
  );
};
