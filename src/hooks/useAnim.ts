import { useEffect, useRef } from "react";

/**
 * Adiciona classe "visible" em todos os elementos .anim dentro do ref
 * quando entram na viewport. Uso: ref={sectionRef} no elemento pai.
 */
export function useAnim(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const els = container.querySelectorAll<HTMLElement>(".anim");
    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [threshold]);

  return ref;
}
