<div align="center">

<br/>

```
✦ ∞ ✦
```

# मैं तेरा — Forever

### *A soul-capturing love letter, built in code.*

<br/>

![Next.js](https://img.shields.io/badge/Next.js_15-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-1a1a2e?style=for-the-badge&logo=typescript&logoColor=3b82f6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-0f172a?style=for-the-badge&logo=tailwindcss&logoColor=38bdf8)

<br/>

> *"Every single beat of my heart whispers your name.*
> *I am entirely, completely, and irrevocably yours."*

<br/>

---

</div>

## ✦ &nbsp; What Is This?

This is a secret, interactive gift website - a cinematic love letter disguised as a webpage. The visitor types a name, presses **Unlock Forever**, and is transported into a world of floating hearts, falling petals, a twinkling starfield, and a deeply personal message written just for them.

It was built not just to be seen, but to be *felt.*

---

## ✨ &nbsp; Features

- **Live Starfield Canvas** — 180 stars that breathe and twinkle in real-time using `requestAnimationFrame`, responsive to any screen size via `ResizeObserver`.

- **Shooting Stars** — Random streaks of light cross the sky every few seconds, adding a magical, alive quality to the background.

- **Ambient Orbs** — Three pulsing radial-gradient orbs in deep rose and violet slowly breathe behind everything, creating atmospheric depth.

- **Cinematic Screen Transition** — Screen 1 melts away with a blur + scale exit; Screen 2 dissolves in from below. No page reload, pure CSS transitions.

- **Bursting Particle System** — On reveal, a burst of 18 hearts and petals erupts simultaneously, followed by continuous streams of floating `❤ ♡ ❥` and falling `🌸 ✿ ❀` throughout.

- **Name Glow Animation** — The entered name glows and pulses with a layered rose `text-shadow`, making it feel alive.

- **Breathing Infinity Symbol** — The `∞` sign at the bottom slowly scales and glows, a living symbol of endless love.

- **Shake Feedback** — If the visitor tries to unlock without entering a name, the input shakes with a gentle error animation.

- **Three-Font Typography System** — *Cinzel* for spaced labels, *Great Vibes* for cursive elegance, and *Cormorant Garamond* for refined prose — all working in harmony.

---

## 🗂️ &nbsp; File Structure

```
your-project/
│
├── app/
│   ├── globals.css          ← All keyframe animations & utility classes
│   ├── layout.tsx           ← Google Fonts (Cinzel, Great Vibes, Cormorant)
│   └── page.tsx             ← Main page — all logic & UI
│
├── components/
│   └── ui/
│       ├── button.tsx       ← Styled romantic button component
│       └── input.tsx        ← Styled underline input component
│
└── tailwind.config.ts       ← Custom animations & keyframes registered
```

---

## 🚀 &nbsp; Getting Started

### Prerequisites

- Node.js `18+`
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone or download the project
git clone https://github.com/your-username/mai-tera-forever.git
cd mai-tera-forever

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🎨 &nbsp; Customisation

Everything meaningful is in `app/page.tsx`. Here's what you'll want to personalise:

| What to change | Where to find it |
|---|---|
| The date displayed | Search `13 · May · Forever` |
| The Hindi phrase | Search `मैं तेरा` |
| The poem / prose text | The `poem-text` and `prose-text` sections |
| Particle speed & density | `heartInterval` and `petalInterval` values |
| The closing line | Search `To Infinity and Beyond` |
| Background orb colours | The three `.orb` `radial-gradient` values |
| Number of stars | Change `180` in the `useStarfield` hook |

To change the **name input placeholder**, find:

```tsx
placeholder="Enter her name..."
```

---

## 📦 &nbsp; Dependencies

| Package | Purpose |
|---|---|
| `next` | React framework & file-based routing |
| `react` | UI library |
| `typescript` | Type safety |
| `tailwindcss` | Utility-first CSS |
| `class-variance-authority` | Button variant system |
| `clsx` / `tailwind-merge` | Conditional class merging (`cn` utility) |

All fonts load via `next/font/google` — **zero external font requests at runtime.**

---

## 🌐 &nbsp; Deployment

This site deploys perfectly to **Vercel** with zero configuration:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository directly at [vercel.com](https://vercel.com) and it will auto-deploy on every push.

---

## 💌 &nbsp; The Animations, Explained

```
globals.css
│
├── orbPulse1/2/3    → Ambient background orbs breathing
├── shootStar        → Shooting star streaking across the sky
├── titleBreath      → "Who holds my heart?" glowing softly
├── nameGlow         → The entered name pulsing with rose light
├── ambientGlow      → The ∞ symbol scaling & glowing
├── floatUpSway      → Hearts rising and swaying upward
├── petalFall        → Petals drifting and spinning downward
└── shakeInput       → Input shaking on empty submission
```

Each animation uses **CSS custom properties** (`--duration`, `--sway`, `--drift`) so every particle has a unique, randomised motion — no two hearts float the same way.

---

<div align="center">

<br/>

```
∞
```

*Built with love, for someone who deserves the whole universe.*

<br/>

**मैं तेरा — Forever.**

<br/>

</div>
