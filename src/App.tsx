import { useRef, useEffect, useCallback } from "react";
import Hero from "./sections/Hero";
import SubHero from "./sections/SubHero";
import Stats from "./sections/Stats";
import ResponseChart from "./sections/ResponseChart";

const SNAP_IDS = ["s1", "s2", "s3"];

function getSnapTop(id: string, c: HTMLElement): number {
  const el = document.getElementById(id);
  if (!el) return 0;
  return el.getBoundingClientRect().top - c.getBoundingClientRect().top + c.scrollTop;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentIdx   = useRef(0);
  const locked       = useRef(false);

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

  // Detecta zona atual pelo scrollTop
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const update = () => {
      const s2 = getSnapTop("s2", c);
      const s3 = getSnapTop("s3", c);
      if      (c.scrollTop < s2) currentIdx.current = 0;
      else if (c.scrollTop < s3) currentIdx.current = 1;
      else                        currentIdx.current = 2;
    };
    c.addEventListener("scroll", update, { passive: true });
    return () => c.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const onWheel = (e: WheelEvent) => {
      const next = currentIdx.current + (e.deltaY > 0 ? 1 : -1);
      if (next < 0 || next >= SNAP_IDS.length) return;
      e.preventDefault();
      goto(next);
    };
    c.addEventListener("wheel", onWheel, { passive: false });
    return () => c.removeEventListener("wheel", onWheel);
  }, [goto]);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    let startY = 0;
    const onStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onEnd   = (e: TouchEvent) => {
      const d = startY - e.changedTouches[0].clientY;
      if (Math.abs(d) > 50) goto(currentIdx.current + (d > 0 ? 1 : -1));
    };
    c.addEventListener("touchstart", onStart, { passive: true });
    c.addEventListener("touchend",   onEnd,   { passive: true });
    return () => { c.removeEventListener("touchstart", onStart); c.removeEventListener("touchend", onEnd); };
  }, [goto]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); goto(currentIdx.current + 1); }
      if (e.key === "ArrowUp"   || e.key === "PageUp"  ) { e.preventDefault(); goto(currentIdx.current - 1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goto]);

  return (
    <div
      ref={containerRef}
      className="bg-white text-brand-dark font-sans"
      style={{ height: "100dvh", overflowY: "scroll", overflowX: "hidden" }}
    >
      {/* Snap 1 — Hero + SubHero */}
      <div id="s1">
        <Hero />
        <SubHero />
      </div>

      {/* Snap 2 — Stats */}
      <div id="s2"><Stats /></div>

      {/* Snap 3 — ResponseChart */}
      <div id="s3"><ResponseChart /></div>
    </div>
  );
}

export default App;
