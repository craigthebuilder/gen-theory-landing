export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-white">
      <h1 className="font-serif text-6xl text-brand-orange">Gentheory</h1>
      <p className="font-sans text-base text-black/60 max-w-md text-center">
        Scaffold ready. Drop assets into <code className="text-brand-orange">/public/images/</code> and we&apos;ll build sections next.
      </p>
      <div className="flex gap-3 mt-2">
        <div className="w-12 h-12 rounded-full bg-brand-orange" title="primary #9F6B2F" />
        <div className="w-12 h-12 rounded-full bg-brand-cream border border-black/10" title="cream #FAEEDE" />
        <div className="w-12 h-12 rounded-full bg-black" title="black" />
        <div className="w-12 h-12 rounded-full bg-white border border-black/10" title="white" />
      </div>
    </main>
  );
}
