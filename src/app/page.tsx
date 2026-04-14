import { Header } from "./_features/header";
import { SideBarAndGenerator } from "./_features/sideBarAndGenerator";

export default async function Home() {
  return (
    <div className="bg-white w-full h-screen flex flex-col">
      <Header />
      <SideBarAndGenerator />
    </div>
  );
}
