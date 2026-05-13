// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "serif"],
        vibes: ["var(--font-vibes)", "cursive"],
        cinzel: ["var(--font-cinzel)", "serif"],
      },
      colors: {
        rose: {
          "300": "#f4a0b8",
          "400": "#ff8fab",
          "500": "#e05c88",
        },
      },
      animation: {
        "orb-1":       "orbPulse1 8s ease-in-out infinite",
        "orb-2":       "orbPulse2 10s ease-in-out infinite",
        "orb-3":       "orbPulse3 6s ease-in-out infinite",
        "title-breath":"titleBreath 4s ease-in-out infinite",
        "name-glow":   "nameGlow 3s ease-in-out infinite",
        "ambient-glow":"ambientGlow 4s ease-in-out infinite",
        "float-heart": "floatUpSway var(--duration, 10s) linear forwards",
        "petal":       "petalFall var(--duration, 8s) linear forwards",
        "shoot":       "shootStar var(--duration, 0.8s) linear forwards",
        "shake":       "shakeInput 0.42s ease",
      },
      keyframes: {
        orbPulse1: {
          "0%, 100%": { transform: "scale(1) translate(0,0)", opacity: "0.7" },
          "50%":      { transform: "scale(1.25) translate(20px,15px)", opacity: "1" },
        },
        orbPulse2: {
          "0%, 100%": { transform: "scale(1) translate(0,0)", opacity: "0.5" },
          "50%":      { transform: "scale(1.15) translate(-15px,-20px)", opacity: "0.9" },
        },
        orbPulse3: {
          "0%, 100%": { transform: "translate(-50%,-50%) scale(1)", opacity: "0.4" },
          "50%":      { transform: "translate(-50%,-50%) scale(1.6)", opacity: "0.7" },
        },
        titleBreath: {
          "0%, 100%": {
            textShadow:
              "0 0 25px rgba(244,120,160,0.5), 0 0 50px rgba(244,100,140,0.2)",
          },
          "50%": {
            textShadow:
              "0 0 45px rgba(244,120,160,0.85), 0 0 90px rgba(244,100,140,0.45)",
          },
        },
        nameGlow: {
          "0%, 100%": {
            textShadow:
              "0 0 30px rgba(255,100,150,0.65), 0 0 70px rgba(255,80,130,0.3)",
          },
          "50%": {
            textShadow:
              "0 0 55px rgba(255,100,150,1), 0 0 110px rgba(255,80,130,0.55)",
          },
        },
        ambientGlow: {
          "0%, 100%": {
            filter: "drop-shadow(0 0 12px rgba(244,120,160,0.5))",
            transform: "scale(1)",
          },
          "50%": {
            filter:
              "drop-shadow(0 0 32px rgba(244,120,160,0.95)) drop-shadow(0 0 65px rgba(244,100,140,0.45))",
            transform: "scale(1.1)",
          },
        },
        floatUpSway: {
          "0%":   { transform: "translateY(0) translateX(0) scale(0.3) rotate(-10deg)", opacity: "0" },
          "10%":  { opacity: "0.85" },
          "50%":  { transform: "translateY(-280px) translateX(var(--sway,30px)) scale(1) rotate(15deg)", opacity: "0.65" },
          "90%":  { opacity: "0.2" },
          "100%": { transform: "translateY(-580px) translateX(calc(var(--sway,30px)*-1)) scale(1.4) rotate(-20deg)", opacity: "0" },
        },
        petalFall: {
          "0%":   { transform: "translateY(-20px) translateX(0) rotate(0deg)", opacity: "0.7" },
          "50%":  { transform: "translateY(310px) translateX(var(--drift,20px)) rotate(360deg)", opacity: "0.5" },
          "100%": { transform: "translateY(640px) translateX(calc(var(--drift,20px)*-0.5)) rotate(720deg)", opacity: "0" },
        },
        shootStar: {
          "0%":   { opacity: "1", transform: "translate(0,0) rotate(var(--angle,25deg))" },
          "100%": { opacity: "0", transform: "translate(320px,160px) rotate(var(--angle,25deg))" },
        },
        shakeInput: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%":      { transform: "translateX(-8px)" },
          "40%":      { transform: "translateX(8px)" },
          "60%":      { transform: "translateX(-6px)" },
          "80%":      { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;