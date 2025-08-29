import { useEffect, useRef, useState } from "react";

export default function HeroChaos() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [chaos, setChaos] = useState(true);
  const [hoverWord, setHoverWord] = useState<number | null>(null);

  // Matrix overlay (auto-disposes after ~1.8s)
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let alive = true;
    const start = performance.now();
    const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      if (!canvas.parentElement) return;
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth * DPR;
      canvas.height = clientHeight * DPR;
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colW = 16;
    const cols = () => Math.ceil((canvas.width / DPR) / colW);
    let drops = Array.from({ length: cols() }, () => Math.floor(Math.random() * 20));

    const draw = (t: number) => {
      if (!alive) return;
      const life = 1800; // ms
      const elapsed = t - start;
      const alpha = Math.max(0, 1 - elapsed / life);

      // trail
      ctx.fillStyle = `rgba(0,0,0,0.10)`;
      ctx.fillRect(0, 0, canvas.width / DPR, canvas.height / DPR);

      ctx.fillStyle = `rgba(255,255,255,${0.55 * alpha})`;
      ctx.font = "16px monospace";

      const currentCols = cols();
      if (drops.length !== currentCols) drops = Array.from({ length: currentCols }, () => 1);

      for (let i = 0; i < drops.length; i++) {
        const ch = String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96));
        ctx.fillText(ch, i * colW, drops[i] * colW);
        if (Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      if (alpha <= 0.01) {
        alive = false;
        ctx.clearRect(0, 0, canvas.width / DPR, canvas.height / DPR);
        if (canvas && canvas.parentElement) canvas.parentElement.removeChild(canvas);
        return;
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  // Scroll-to-clarity via IntersectionObserver (skip if reduced motion)
  useEffect(() => {
    if (!rootRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setChaos(false); return; }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting && e.intersectionRatio > 0.2) setChaos(false); }),
      { threshold: [0, 0.2, 0.5, 1] }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, []);

  const words = ["Dental", "Chaos", "Made", "Clockwork"];

  return (
    <section id="hero" className="min-h-screen bg-pure-black text-pure-white flex flex-col justify-center relative overflow-hidden">
      {/* Matrix overlay (removed after fade) */}
      <div className="pointer-events-none absolute inset-0">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      <div ref={rootRef} className="container mx-auto px-8 relative z-10">
        <div className="text-center">
          {/* Four-line stacked heading */}
          {words.map((w, idx) => {
            const hovered = hoverWord === idx;
            const resolve = !chaos || hovered;
            return (
              <h1 key={idx}
                  onMouseEnter={() => setHoverWord(idx)}
                  onMouseLeave={() => setHoverWord(null)}
                  className={[
                    "block hero-text font-extrabold tracking-tight",
                    "text-6xl sm:text-7xl md:text-8xl",
                    "will-change-transform transition-all duration-500 ease-out select-none"
                  ].join(" ")}
                  style={{
                    filter: resolve ? "none" : "blur(8px)",
                    opacity: resolve ? 1 : 0.8,
                    transform: resolve
                      ? "translate3d(0,0,0) scale(1)"
                      : `translate3d(${(Math.random()*6-3).toFixed(1)}px, ${(Math.random()*6-3).toFixed(1)}px, 0) scale(1.04)`,
                    letterSpacing: resolve ? "0em" : (Math.random() > 0.5 ? "0.04em" : "-0.02em"),
                    transitionDelay: resolve ? "40ms" : "0ms",
                  }}>
                {w}
              </h1>
            );
          })}
        </div>

        <div className="mt-16">
          <div className="text-center max-w-4xl mx-auto">
            <p className="subtitle-text text-gray-300 mb-12">
              Custom operatory management on desktop, mobile, and watch.
            </p>
            <button className="text-lg font-medium text-pure-white border-b border-pure-white hover:border-gray-300 hover:text-gray-300 transition-all duration-300">
              Start Mapping Your Practice
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="text-sm text-gray-400 animate-bounce">
          Keep Scrolling
        </div>
      </div>

      {/* Optional soft vignette */}
      <div className="pointer-events-none absolute inset-0 opacity-20"
           style={{ background: "radial-gradient(1200px 500px at 50% 50%, rgba(255,255,255,0.05), transparent 60%)" }} />
    </section>
  );
}