import { Header } from "@/app/_features/header";
import { QuizSection } from "../_features/quizSection";

export default async function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <QuizSection />
    </div>
  );
}
