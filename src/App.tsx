import { useRef, useEffect, useCallback } from "react";
import Hero from "./sections/Hero";
import SubHero from "./sections/SubHero";
import Stats from "./sections/Stats";
import ResponseChart from "./sections/ResponseChart";
import TruthSection from "./sections/TruthMorphSection";
import Section5 from "./sections/Section5";
import Section6 from "./sections/Section6";

const SNAP_IDS = ["s1", "s2", "s3", "s4", "s5", "s6"];

function getSnapTop(id: string, c: HTMLElement): number {
  const el = document.getElementById(id);
  if (!el) return 0;
  return Math.round(el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop);
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIdx   = useRef(0);
  const locked       = useRef(false);
  const s4bVisible   = useRef(false);
  const revealFn     = useRef<(() => void) | null>(null);
  const hideFn       = useRef<(() => void) | null>(null);

  const onRevealReady = useCallback((reveal: () => void, hide: () => void) => {
    revealFn.current = reveal;
    hideFn.current   = hide;
  }, []);

  const animateTo = useCallback((target: number, onDone?: () => void) => {
    const c = containerRef.current;
    if (!c) return;
    const start = c.scrollTop, dist = target - start, t0 = performance.now();
    const step = (now: number) => {
      const p    = Math.min((now - t0) / 850, 1);
      const ease = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2;
      c.scrollTop = start + dist * ease;
      if (p < 1) requestAnimationFrame(step); else onDone?.();
    };
    requestAnimationFrame(step);
  }, []);

  const goto = useCallback((idx: number) => {
    const c = containerRef.current;
    if (!c || locked.current) return;
    const clamped = Math.max(0, Math.min(idx, SNAP_IDS.length - 1));
    if (clamped === currentIdx.current) return;
    locked.current     = true;
    currentIdx.current = clamped;
    animateTo(getSnapTop(SNAP_IDS[clamped], c), () => { locked.current = false; });
  }, [animateTo]);

  const scrollDown = useCallback(() => {
    if (locked.current) return;
    // Em s4: primeiro scroll revela 4b, depois avança para s5
    if (currentIdx.current === 3) {
      if (!s4bVisible.current) { s4bVisible.current = true; revealFn.current?.(); return; }
    }
    if (currentIdx.current === SNAP_IDS.length - 1) return;
    goto(currentIdx.current + 1);
  }, [goto]);

  const scrollUp = useCallback(() => {
    if (locked.current) return;
    // Se 4b estiver visível, esconde antes de voltar
    if (s4bVisible.current) { s4bVisible.current = false; hideFn.current?.(); return; }
    goto(currentIdx.current - 1);
  }, [goto]);

  // Detecta zona atual pelo scrollTop
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const update = () => {
      if (locked.current) return;
      const snaps = SNAP_IDS.map(id => getSnapTop(id, c));
      let idx = 0;
      for (let i = snaps.length - 1; i >= 0; i--) {
        if (c.scrollTop >= snaps[i] - 10) { idx = i; break; }
      }
      currentIdx.current = idx;
    };
    c.addEventListener("scroll", update, { passive: true });
    return () => c.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) scrollDown(); else scrollUp();
    };
    c.addEventListener("wheel", onWheel, { passive: false });
    return () => c.removeEventListener("wheel", onWheel);
  }, [scrollDown, scrollUp]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const d = startY - e.changedTouches[0].clientY;
      if (Math.abs(d) > 50) { if (d > 0) scrollDown(); else scrollUp(); }
    };
    c.addEventListener("touchstart", onStart, { passive: true });
    c.addEventListener("touchend",   onEnd,   { passive: true });
    return () => { c.removeEventListener("touchstart", onStart); c.removeEventListener("touchend", onEnd); };
  }, [scrollDown, scrollUp]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); scrollDown(); }
      if (e.key === "ArrowUp"   || e.key === "PageUp"  ) { e.preventDefault(); scrollUp(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [scrollDown, scrollUp]);

  return (
    <>
      {/* Textura global de dots — fixa, cobre todo o viewport */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, rgba(154, 209, 255, 0.12) 1.5px, transparent 0)",
        backgroundSize: "28px 28px",
      }} />

    <div
      ref={containerRef}
      className="bg-white text-brand-dark font-sans"
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden" }}
    >
      <div id="s1"><Hero /><SubHero /></div>
      <div id="s2"><ResponseChart /></div>
      <div id="s3"><Stats /></div>
      <TruthSection onRevealReady={onRevealReady} />
      <Section5 />
      <Section6 />
    </div>
    </>
  );
}

export default App;
