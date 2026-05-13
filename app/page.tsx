// app/page.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Types ─── */
interface Particle {
  id: number;
  left: string;
  duration: string;
  delay: string;
  size: string;
  sway: string;
  content: string;
}

interface Star {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
}

interface ShootingStar {
  id: number;
  top: string;
  left: string;
  angle: string;
  duration: string;
}

/* ─── Constants ─── */
const HEART_CONTENTS = ["❤", "♡", "❤", "❥", "❤", "✿"];
const PETAL_CONTENTS = ["🌸", "✿", "❀", "✾", "🌺"];

/* ─── Starfield Hook ─── */
function useStarfield(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const stars: Star[] = [];

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function init() {
      if (!canvas) return;
      stars.length = 0;
      for (let i = 0; i < 180; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.3 + 0.2,
          speed: Math.random() * 0.007 + 0.002,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function draw(t: number) {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const time = t / 100;
      for (const s of stars) {
        const alpha = 0.12 + 0.65 * (0.5 + 0.5 * Math.sin(time * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,218,232,${alpha.toFixed(2)})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);
    resize();
    init();
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [canvasRef]);
}

/* ─── Component ─── */
export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [isRevealed, setIsRevealed] = useState(false);
  const [hearts, setHearts] = useState<Particle[]>([]);
  const [petals, setPetals] = useState<Particle[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const [shakeInput, setShakeInput] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useStarfield(canvasRef);

  /* ── Shooting stars (always active) ── */
  useEffect(() => {
    function spawnShooter() {
      const star: ShootingStar = {
        id: Date.now() + Math.random(),
        top: `${Math.random() * 55}%`,
        left: `${Math.random() * 40}%`,
        angle: `${20 + Math.random() * 20}deg`,
        duration: `${0.55 + Math.random() * 0.5}s`,
      };
      setShootingStars((prev) => [...prev, star]);
      setTimeout(() => {
        setShootingStars((prev) => prev.filter((s) => s.id !== star.id));
      }, 1500);
    }

    spawnShooter();
    const first = setTimeout(spawnShooter, 2500);
    const interval = setInterval(
      spawnShooter,
      4000 + Math.random() * 3000
    );
    return () => {
      clearTimeout(first);
      clearInterval(interval);
    };
  }, []);

  /* ── Particles after reveal ── */
  const spawnParticles = useCallback(() => {
    // Hearts
    const heartInterval = setInterval(() => {
      setHearts((prev) => {
        const heart: Particle = {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${8 + Math.random() * 5}s`,
          delay: `${Math.random() * 1.2}s`,
          size: `${13 + Math.random() * 13}px`,
          sway: `${Math.random() * 70 - 35}px`,
          content:
            HEART_CONTENTS[Math.floor(Math.random() * HEART_CONTENTS.length)],
        };
        return [...prev.slice(-40), heart];
      });
    }, 380);

    // Petals
    const petalInterval = setInterval(() => {
      setPetals((prev) => {
        const petal: Particle = {
          id: Date.now() + Math.random(),
          left: `${Math.random() * 100}%`,
          duration: `${5 + Math.random() * 6}s`,
          delay: `${Math.random() * 1.5}s`,
          size: `${11 + Math.random() * 8}px`,
          sway: `${Math.random() * 40 - 20}px`,
          content:
            PETAL_CONTENTS[Math.floor(Math.random() * PETAL_CONTENTS.length)],
        };
        return [...prev.slice(-35), petal];
      });
    }, 550);

    return () => {
      clearInterval(heartInterval);
      clearInterval(petalInterval);
    };
  }, []);

  useEffect(() => {
    if (!isRevealed) return;

    // Burst of particles on reveal
    for (let i = 0; i < 18; i++) {
      const delay = i * 65;
      setTimeout(() => {
        setHearts((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            left: `${Math.random() * 100}%`,
            duration: `${8 + Math.random() * 4}s`,
            delay: "0s",
            size: `${12 + Math.random() * 14}px`,
            sway: `${Math.random() * 70 - 35}px`,
            content:
              HEART_CONTENTS[Math.floor(Math.random() * HEART_CONTENTS.length)],
          },
        ]);
        setPetals((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random() + 1,
            left: `${Math.random() * 100}%`,
            duration: `${5 + Math.random() * 5}s`,
            delay: "0s",
            size: `${11 + Math.random() * 9}px`,
            sway: `${Math.random() * 40 - 20}px`,
            content:
              PETAL_CONTENTS[
                Math.floor(Math.random() * PETAL_CONTENTS.length)
              ],
          },
        ]);
      }, delay);
    }

    const cleanup = spawnParticles();
    return cleanup;
  }, [isRevealed, spawnParticles]);

  /* ── Handlers ── */
  function handleReveal() {
    if (!nameInput.trim()) {
      setShakeInput(true);
      setTimeout(() => setShakeInput(false), 500);
      return;
    }
    setIsRevealed(true);
  }

  /* ─── Render ─── */
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030308] text-slate-100 selection:bg-rose-500/30">

      {/* ── Starfield Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        aria-hidden="true"
      />

      {/* ── Ambient Orbs ── */}
      <div
        aria-hidden="true"
        className="absolute z-1 rounded-full pointer-events-none animate-orb-1"
        style={{
          width: "480px",
          height: "480px",
          top: "-130px",
          left: "-130px",
          background:
            "radial-gradient(circle, rgba(180,40,80,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute z-1 rounded-full pointer-events-none animate-orb-2"
        style={{
          width: "400px",
          height: "400px",
          bottom: "-100px",
          right: "-100px",
          background:
            "radial-gradient(circle, rgba(100,40,180,0.14) 0%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute z-1 rounded-full pointer-events-none animate-orb-3"
        style={{
          width: "280px",
          height: "280px",
          top: "50%",
          left: "50%",
          background:
            "radial-gradient(circle, rgba(200,80,120,0.09) 0%, transparent 70%)",
        }}
      />

      {/* ── Shooting Stars ── */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          aria-hidden="true"
          className="absolute pointer-events-none z-3 animate-shoot"
          style={{
            top: s.top,
            left: s.left,
            width: "110px",
            height: "1px",
            borderRadius: "2px",
            background:
              "linear-gradient(90deg, rgba(255,210,225,0.9), transparent)",
            ["--angle" as string]: s.angle,
            ["--duration" as string]: s.duration,
            transform: `rotate(${s.angle})`,
          }}
        />
      ))}

      {/* ── Particles Container ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-2 overflow-hidden"
      >
        {/* Hearts */}
        {hearts.map((h) => (
          <div
            key={h.id}
            className="absolute animate-float-heart"
            style={{
              left: h.left,
              bottom: "-30px",
              fontSize: h.size,
              color: "rgba(255, 100, 130, 0.55)",
              textShadow: "0 0 10px rgba(255,80,120,0.6)",
              ["--duration" as string]: h.duration,
              ["--sway" as string]: h.sway,
              animationDelay: h.delay,
            }}
          >
            {h.content}
          </div>
        ))}

        {/* Petals */}
        {petals.map((p) => (
          <div
            key={p.id}
            className="absolute animate-petal"
            style={{
              left: p.left,
              top: "-20px",
              fontSize: p.size,
              opacity: 0.5,
              ["--duration" as string]: p.duration,
              ["--drift" as string]: p.sway,
              animationDelay: p.delay,
            }}
          >
            {p.content}
          </div>
        ))}
      </div>

      {/* ════════════════════════════════
          SCREEN 1 — Input
      ════════════════════════════════ */}
      <div
        className={`
          absolute z-10 flex flex-col items-center justify-center
          glass-panel rounded-[28px]
          px-10 py-12 w-[min(480px,90%)]
          transition-all duration-1200 ease-in-out
          ${isRevealed ? "screen-exit" : "opacity-100 scale-100"}
        `}
      >
        {/* Title */}
        <h2
          className="animate-title-breath text-glow-soft"
          style={{
            fontFamily: "var(--font-vibes), cursive",
            fontSize: "clamp(42px, 8vw, 56px)",
            color: "#f4a0b8",
            textAlign: "center",
            marginBottom: "6px",
            lineHeight: 1.2,
          }}
        >
          Who holds my heart?
        </h2>

        {/* Sub-label */}
        <p
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "9px",
            letterSpacing: "5px",
            color: "rgba(200,150,170,0.45)",
            textTransform: "uppercase",
            marginBottom: "36px",
          }}
        >
          a secret message awaits
        </p>

        {/* Ornament divider */}
        <div className="ornament-line" style={{ marginBottom: "30px" }}>
          <span style={{ color: "rgba(244,120,160,0.5)", fontSize: "16px" }}>✦</span>
        </div>

        {/* Name input */}
        <input
          type="text"
          placeholder="Enter her name..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleReveal()}
          autoComplete="off"
          className={shakeInput ? "animate-shake" : ""}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            borderBottom: shakeInput
              ? "1.5px solid rgba(255,80,80,0.65)"
              : "1.5px solid rgba(244,120,160,0.22)",
            color: "#f8e8ee",
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "22px",
            textAlign: "center",
            padding: "12px 8px",
            outline: "none",
            letterSpacing: "2px",
            marginBottom: "34px",
            transition: "border-color 0.4s",
          }}
        />

        {/* Unlock button */}
        <button
          onClick={handleReveal}
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "9.5px",
            letterSpacing: "5px",
            textTransform: "uppercase",
            color: "#f4a0b8",
            background: "rgba(244,100,140,0.055)",
            border: "1px solid rgba(244,100,140,0.2)",
            borderRadius: "50px",
            padding: "15px 48px",
            cursor: "pointer",
            transition: "all 0.5s",
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.borderColor = "rgba(244,100,140,0.65)";
            t.style.color = "#fff";
            t.style.boxShadow =
              "0 0 30px rgba(244,80,120,0.32), 0 0 65px rgba(244,80,120,0.12)";
            t.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.borderColor = "rgba(244,100,140,0.2)";
            t.style.color = "#f4a0b8";
            t.style.boxShadow = "none";
            t.style.transform = "translateY(0)";
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          ✦ &nbsp; Unlock Forever &nbsp; ✦
        </button>
      </div>

      {/* ════════════════════════════════
          SCREEN 2 — Reveal
      ════════════════════════════════ */}
      <div
        className={`
          z-10 flex flex-col items-center justify-center
          text-center glass-panel rounded-4xl
          px-10 py-12 w-[min(560px,92%)]
          max-h-[90vh] overflow-y-auto
          transition-all duration-1200ms delay-300 ease-in-out
          ${isRevealed
            ? "screen-enter"
            : "opacity-0 translate-y-10 pointer-events-none blur-sm"
          }
        `}
        style={{ scrollbarWidth: "none" }}
      >
        {/* Date stamp */}
        <p
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "9px",
            letterSpacing: "5px",
            color: "rgba(200,150,170,0.42)",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          13 · May · Forever
        </p>

        {/* Main greeting */}
        <p
          style={{
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "13px",
            letterSpacing: "3.5px",
            color: "rgba(220,190,210,0.65)",
            textTransform: "uppercase",
            marginBottom: "4px",
          }}
        >
          Happy 13th May
        </p>

        {/* Hindi */}
        <p
          className="text-glow-soft"
          style={{
            fontFamily: "var(--font-vibes), cursive",
            fontSize: "clamp(30px,6vw,40px)",
            color: "#f4a0b8",
            marginBottom: "2px",
          }}
        >
          मैं तेरा
        </p>

        {/* The Name */}
        <span
          className="animate-name-glow block"
          style={{
            fontFamily: "var(--font-vibes), cursive",
            fontSize: "clamp(60px, 12vw, 80px)",
            color: "#ff8fab",
            lineHeight: 1.1,
            margin: "8px 0 24px",
          }}
        >
          {nameInput}
        </span>

        {/* Divider */}
        <div className="ornament-line" style={{ marginBottom: "22px" }}>
          <span style={{ color: "rgba(244,120,160,0.5)", fontSize: "15px" }}>❧</span>
        </div>

        {/* Poem */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(15px, 3vw, 18px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(222,196,212,0.82)",
            lineHeight: 1.9,
            marginBottom: "20px",
            letterSpacing: "0.3px",
          }}
        >
          &ldquo;Every single beat of my heart whispers your name,{" "}
          <span style={{ color: "#f4a0b8", fontStyle: "normal", fontWeight: 400 }}>
            {nameInput}
          </span>
          .<br />
          Today is just a beautiful excuse to remind you -<br />I am entirely,
          completely, and irrevocably{" "}
          <em style={{ color: "#ffb3c6" }}>yours.</em>&rdquo;
        </p>

        {/* Prose */}
        <p
          style={{
            fontFamily: "var(--font-cormorant), serif",
            fontSize: "clamp(14px, 2.8vw, 17px)",
            fontWeight: 300,
            color: "rgba(200,175,192,0.75)",
            lineHeight: 1.95,
            marginBottom: "24px",
          }}
        >
          You are my one and only. No one else could ever take your place,
          <br />
          because my world was built for you - and only for you.
          <br />
          My love has no limits, no conditions, and no end.
        </p>

        {/* Second divider */}
        <div className="ornament-line" style={{ marginBottom: "18px" }}>
          <span style={{ color: "rgba(244,120,160,0.45)", fontSize: "14px" }}>✦</span>
        </div>

        {/* Infinity */}
        <span
          className="animate-ambient-glow block"
          style={{
            fontSize: "62px",
            color: "#f4a0b8",
            lineHeight: 1,
            marginBottom: "14px",
          }}
        >
          ∞
        </span>

        {/* Closing */}
        <p
          className="text-glow-soft"
          style={{
            fontFamily: "var(--font-vibes), cursive",
            fontSize: "clamp(34px, 7vw, 44px)",
            color: "#f4a0b8",
          }}
        >
          To Infinity and Beyond.
        </p>
      </div>
    </main>
  );
}