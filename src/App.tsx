import { useEffect } from "react";
import Lenis from "lenis";
import Hero from "./sections/Hero";
import Stats from "./sections/Stats";

function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    let raf: number;
    const tick = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-brand-dark font-sans">
      <Hero />
      <Stats />
      {/* Adicionar seções aqui */}
    </div>
  );
}

export default App;
