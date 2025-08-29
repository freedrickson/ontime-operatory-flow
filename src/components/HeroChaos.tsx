import { useEffect, useRef, useState } from "react";

export default function HeroChaos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealedWords, setRevealedWords] = useState<boolean[]>([false, false, false, false]);
  const [hoverWord, setHoverWord] = useState<number | null>(null);

  // Matrix overlay removed

  // Staged word revelation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedWords([true, true, true, true]);
      return;
    }

    const timers = [
      setTimeout(() => setRevealedWords(prev => [true, prev[1], prev[2], prev[3]]), 1000),
      setTimeout(() => setRevealedWords(prev => [prev[0], true, prev[2], prev[3]]), 2000),
      setTimeout(() => setRevealedWords(prev => [prev[0], prev[1], true, prev[3]]), 3000),
      setTimeout(() => setRevealedWords(prev => [prev[0], prev[1], prev[2], true]), 3500),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const words = ["Dental", "Chaos", "Made", "Clockwork"];

  const generateMatrixText = (word: string) => {
    return Array.from({ length: word.length }, () => 
      Math.random() > 0.5 ? "1" : "0"
    ).join("");
  };

  return (
    <section id="hero" className="min-h-screen bg-pure-black text-pure-white flex flex-col justify-center relative overflow-hidden">

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center">
          {/* Four-line stacked heading */}
          {words.map((word, idx) => {
            const hovered = hoverWord === idx;
            const revealed = revealedWords[idx] || hovered;
            const displayText = revealed ? word : generateMatrixText(word);
            
            return (
              <h1 key={`${idx}-${revealed}`}
                  onMouseEnter={() => setHoverWord(idx)}
                  onMouseLeave={() => setHoverWord(null)}
                  className={[
                    "block hero-text font-extrabold tracking-tight",
                    "text-6xl sm:text-7xl md:text-8xl",
                    "will-change-transform transition-all duration-500 ease-out select-none"
                  ].join(" ")}
                  style={{
                    filter: revealed ? "none" : "blur(2px)",
                    opacity: revealed ? 1 : 0.7,
                    transform: revealed
                      ? "translate3d(0,0,0) scale(1)"
                      : `translate3d(${(Math.random()*4-2).toFixed(1)}px, ${(Math.random()*4-2).toFixed(1)}px, 0) scale(1.02)`,
                    letterSpacing: revealed ? "0em" : "0.1em",
                    transitionDelay: revealed ? "0ms" : "0ms",
                    fontFamily: revealed ? "inherit" : "monospace"
                  }}>
                {displayText}
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