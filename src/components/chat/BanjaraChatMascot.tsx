"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

export interface BanjaraMascotHandle {
  sit: () => void;
  think: () => void;
  rise: (cheer?: boolean) => void;
  idle: () => void;
  poke: () => void;
}

interface BanjaraChatMascotProps {
  variant?: "lg" | "dock";
  className?: string;
  onStateChange?: (state: "idle" | "sit" | "think" | "rise" | "trick") => void;
}

const COLS = 10;
const ROWS = 6;
const MOVE_ROWS = 9;
const STAND = 13;
const SEAT = 40;
const MED_FIRST = 41;
const MED_LAST = 51;
const MOVE = 100;

const MOVES = {
  wave: { fps: 8, frames: [0, 1, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 5, 4, 2, 1, 0] },
  runLaugh: {
    fps: 10,
    frames: [
      0, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33,
      34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51,
      52, 53, 54, 55,
    ],
  },
  namaste: {
    fps: 8,
    frames: [
      0, 57, 58, 60, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
      76, 77, 78, 79, 80, 81, 82, 63, 61, 59, 57, 56,
    ],
  },
};

const QUIPS = [
  "Where to, boss?",
  "Pack light, walk far.",
  "Chai first? ☕",
  "The mountains are calling!",
  "Tickles! 😄",
  "Ready when you are.",
  "Ladakh or Spiti?",
];

function range(a: number, b: number): number[] {
  const out: number[] = [];
  const step = a <= b ? 1 : -1;
  for (let i = a; i !== b + step; i += step) out.push(i);
  return out;
}

export const BanjaraChatMascot = forwardRef<
  BanjaraMascotHandle,
  BanjaraChatMascotProps
>(({ variant = "dock", className = "", onStateChange }, ref) => {
  const [mode, setMode] = useState<"idle" | "sit" | "think" | "rise" | "trick">("idle");
  const [frame, setFrame] = useState(STAND);
  const [isMoveSheet, setIsMoveSheet] = useState(false);
  const [bgPos, setBgPos] = useState("33.33% 20%");
  const [activeTrick, setActiveTrick] = useState<string | null>(null);
  const [quipText, setQuipText] = useState<string | null>(null);

  const modeRef = useRef<"idle" | "sit" | "think" | "rise" | "trick">("idle");
  const frameRef = useRef(STAND);
  const queueRef = useRef<number[]>([]);
  const fpsRef = useRef(30);
  const thenRef = useRef<(() => void) | null>(null);
  const lastTimeRef = useRef(0);
  const fidgetAtRef = useRef(0);
  const riseNextRef = useRef<boolean | null>(null);
  const lastTrickRef = useRef(-1);
  const bubbleTimerRef = useRef<NodeJS.Timeout | null>(null);

  modeRef.current = mode;
  frameRef.current = frame;

  // Compute CSS background position for sprite
  const applyPaint = (fNum: number) => {
    const onMoves = fNum >= MOVE;
    const f = onMoves ? fNum - MOVE : fNum;
    const x = ((f % COLS) / (COLS - 1)) * 100;
    const y =
      (Math.floor(f / COLS) / ((onMoves ? MOVE_ROWS : ROWS) - 1)) * 100;
    setIsMoveSheet(onMoves);
    setBgPos(`${x}% ${y}%`);
  };

  const play = (frames: number[], rate: number, done: () => void) => {
    queueRef.current = frames.slice();
    fpsRef.current = rate;
    thenRef.current = done;
  };

  const idle = () => {
    setMode("idle");
    onStateChange?.("idle");
    fidgetAtRef.current = performance.now() + 5000;
    applyPaint(STAND);
  };

  const think = () => {
    setMode("think");
    onStateChange?.("think");
    if (riseNextRef.current !== null) {
      const cheer = riseNextRef.current;
      riseNextRef.current = null;
      rise(cheer);
      return;
    }
    const loop = () => {
      if (modeRef.current === "think") {
        play(
          range(MED_FIRST, MED_LAST).concat(
            range(MED_LAST - 1, MED_FIRST + 1)
          ),
          8,
          loop
        );
      }
    };
    play([MED_FIRST], 8, loop);
  };

  const sit = () => {
    riseNextRef.current = null;
    let curF = frameRef.current;
    if (curF >= MOVE) curF = STAND;
    if (curF > SEAT) {
      think();
      return;
    }
    setMode("sit");
    onStateChange?.("sit");
    applyPaint(curF);
    play(range(curF, SEAT), 30, think);
  };

  const rise = (cheer = true) => {
    if (modeRef.current === "sit") {
      riseNextRef.current = cheer;
      return;
    }
    if (modeRef.current !== "think") return;
    setMode("rise");
    onStateChange?.("rise");
    const curF = frameRef.current;
    play(range(Math.min(curF, SEAT), STAND), 36, () => {
      idle();
      if (cheer) {
        setActiveTrick("is-cheer");
        setTimeout(() => setActiveTrick(null), 700);
      }
    });
  };

  const sayQuip = (text?: string) => {
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    const chosen = text || QUIPS[Math.floor(Math.random() * QUIPS.length)];
    setQuipText(chosen);
    bubbleTimerRef.current = setTimeout(() => {
      setQuipText(null);
    }, 2200);
  };

  const moveTrick = (name: "wave" | "runLaugh" | "namaste") => {
    play(
      MOVES[name].frames.map((f) => f + MOVE).concat([STAND]),
      MOVES[name].fps,
      () => {
        idle();
      }
    );
  };

  const poke = () => {
    if (modeRef.current !== "idle" || queueRef.current.length) return;
    let t: number;
    do {
      t = Math.floor(Math.random() * 7);
    } while (t === lastTrickRef.current);
    lastTrickRef.current = t;

    if (t === 4) {
      sayQuip("Hello there! 👋");
      moveTrick("wave");
      return;
    }
    if (t === 5) {
      sayQuip("Race you! 🏃");
      moveTrick("runLaugh");
      setTimeout(() => {
        if (modeRef.current === "idle") sayQuip("Haha, kidding! 😄");
      }, 2100);
      return;
    }
    if (t === 6) {
      sayQuip("Namaste! 🙏");
      moveTrick("namaste");
      return;
    }

    sayQuip();

    if (t === 0) {
      setActiveTrick("is-cheer");
      setTimeout(() => setActiveTrick(null), 700);
    } else if (t === 1) {
      setActiveTrick("is-spin");
      setTimeout(() => setActiveTrick(null), 800);
    } else if (t === 2) {
      play(
        range(STAND - 1, 0).concat(range(1, STAND)),
        24,
        () => {
          setActiveTrick("is-cheer");
          setTimeout(() => setActiveTrick(null), 700);
        }
      );
    } else {
      setMode("trick");
      play(range(frameRef.current, SEAT), 30, () => {
        if (modeRef.current !== "trick") return;
        play(range(MED_FIRST, MED_LAST), 10, () => {
          if (modeRef.current !== "trick") return;
          play(range(SEAT, STAND), 36, () => {
            if (modeRef.current !== "trick") return;
            idle();
            setActiveTrick("is-cheer");
            setTimeout(() => setActiveTrick(null), 700);
          });
        });
      });
    }
  };

  useImperativeHandle(ref, () => ({
    sit,
    think,
    rise,
    idle,
    poke,
  }));

  // Animation frame ticker loop
  useEffect(() => {
    let animId: number;
    fidgetAtRef.current = performance.now() + 4000;

    const tick = (now: number) => {
      animId = requestAnimationFrame(tick);
      if (document.hidden) return;

      const step = 1000 / fpsRef.current;
      if (now - lastTimeRef.current > 500) {
        lastTimeRef.current = now - step;
      }
      if (now - lastTimeRef.current < step) return;

      const steps = Math.floor((now - lastTimeRef.current) / step);
      lastTimeRef.current += steps * step;

      if (queueRef.current.length > 0) {
        const nextF = queueRef.current.splice(0, steps).pop()!;
        setFrame(nextF);
        applyPaint(nextF);
        if (queueRef.current.length === 0 && thenRef.current) {
          const cb = thenRef.current;
          thenRef.current = null;
          cb();
        }
      } else if (modeRef.current === "idle" && now > fidgetAtRef.current) {
        fidgetAtRef.current = now + 7000 + Math.random() * 6000;
        play(
          range(STAND - 1, 0).concat(range(1, STAND)),
          15,
          () => {}
        );
      }
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const sizeClass = variant === "lg" ? "pc-mascot-lg" : "pc-mascot-dock";

  return (
    <span
      className={`pc-mascot ${sizeClass} ${activeTrick || ""} ${className}`}
      data-state={mode}
      onClick={poke}
      title="Click Banjara to interact!"
      aria-hidden="true"
    >
      <span
        className={`pc-mascot-sprite ${isMoveSheet ? "is-move" : ""}`}
        style={{ backgroundPosition: bgPos }}
      />
      <span className="pc-mascot-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {quipText && <span className="pc-mascot-bubble">{quipText}</span>}
    </span>
  );
});

BanjaraChatMascot.displayName = "BanjaraChatMascot";
