import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Hero />
      {/* TODO: AncientBalance scroll section */}
      {/* TODO: Tremella scroll section */}
      <section
        id="waitlist"
        className="min-h-screen flex items-center justify-center bg-white px-6"
      >
        <p className="font-serif text-3xl md:text-4xl text-black/40 text-center">
          Waitlist section — building next
        </p>
      </section>
    </>
  );
}
