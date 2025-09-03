import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SplitFlapState {
  phase: number[];
  isRevealing: boolean[];
}

export default function HeroChaos() {
  const [revealedWords, setRevealedWords] = useState<boolean[]>([false, false, false, false]);
  const [hoverWord, setHoverWord] = useState<number | null>(null);
  const [splitFlapStates, setSplitFlapStates] = useState<SplitFlapState[]>([]);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  const navigate = useNavigate();

  const words = ["Dental", "Chaos", "Made", "Clockwork"];

  // Initialize split-flap states
  useEffect(() => {
    const initialStates = words.map(word => ({
      phase: Array(word.length).fill(0),
      isRevealing: Array(word.length).fill(false)
    }));
    setSplitFlapStates(initialStates);
  }, []);

  // Split-flap ticker animation
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setRevealedWords([true, true, true, true]);
      return;
    }

    const FPS = 15;
    const FRAME_INTERVAL = 1000 / FPS;
    const COLUMN_OFFSET = 45; // ms between columns

    const animate = (currentTime: number) => {
      if (currentTime - lastFrameTime.current >= FRAME_INTERVAL) {
        setSplitFlapStates(prevStates => 
          prevStates.map((state, wordIndex) => {
            if (revealedWords[wordIndex] || hoverWord === wordIndex) return state;
            
            const newPhase = state.phase.map((phase, charIndex) => {
              const columnDelay = charIndex * COLUMN_OFFSET;
              const elapsed = (currentTime - columnDelay) % 640; // 320ms * 2 for 0→1→0 cycle
              return elapsed < 320 ? 1 : 0;
            });

            return { ...state, phase: newPhase };
          })
        );
        lastFrameTime.current = currentTime;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [revealedWords, hoverWord]);

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

  const generateSplitFlapText = (word: string, wordIndex: number) => {
    if (!splitFlapStates[wordIndex]) return word;
    
    return Array.from({ length: word.length }, (_, charIndex) => {
      const phase = splitFlapStates[wordIndex].phase[charIndex];
      return phase === 1 ? "1" : "0";
    }).join("");
  };

  return (
    <section id="hero" className="min-h-screen bg-pure-black text-pure-white flex flex-col justify-center relative overflow-hidden">

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center">
          {/* Four-line stacked heading */}
          {words.map((word, idx) => {
            const hovered = hoverWord === idx;
            const revealed = revealedWords[idx] || hovered;
            const displayText = revealed ? word : generateSplitFlapText(word, idx);
            
            return (
              <h1 key={`${idx}-${revealed}`}
                  onMouseEnter={() => setHoverWord(idx)}
                  onMouseLeave={() => setHoverWord(null)}
                  className={[
                    "block hero-text font-extrabold tracking-tight",
                    "text-6xl sm:text-7xl md:text-8xl",
                    "will-change-transform select-none",
                    revealed ? "split-flap-revealed" : "split-flap-ticker"
                  ].join(" ")}
                  style={{
                    filter: revealed ? "none" : "blur(1px)",
                    opacity: revealed ? 1.0 : 0.65,
                    transform: revealed 
                      ? "translate3d(0,0,0) scale(1.0) rotateX(0deg)" 
                      : "translate3d(0,0,0) scale(0.95) rotateX(0deg)",
                    letterSpacing: revealed ? "0em" : "0.05em",
                    fontFamily: revealed ? "inherit" : "monospace",
                    fontSize: revealed ? "inherit" : "0.92em",
                    transition: revealed 
                      ? "all 400ms cubic-bezier(0.22, 1, 0.36, 1)"
                      : "none",
                    textShadow: revealed 
                      ? "none" 
                      : "0 1px 0 rgba(255,255,255,0.08)"
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
            <button 
              onClick={() => navigate('/build')}
              className="text-lg font-medium text-pure-white border-b border-pure-white hover:border-gray-300 hover:text-gray-300 transition-all duration-300 cursor-pointer"
            >
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