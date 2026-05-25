import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import AncientBalance from "./components/AncientBalance";
import Tremella from "./components/Tremella";
import Waitlist from "./components/Waitlist";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      <AncientBalance />
      <Tremella />
      <Waitlist />
    </>
  );
}
