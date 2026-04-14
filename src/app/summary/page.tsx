import { Header } from "@/app/_features/header";
import { SideBarAndSummarySection } from "./_features/sideBarAndSummarySection";

export default async function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <SideBarAndSummarySection />
    </div>
  );
}
