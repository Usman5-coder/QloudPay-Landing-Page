import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/** Adds `.is-visible` once the element scrolls into view. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      typeof window === "undefined" ||
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      node.classList.add("is-visible");
      return;
    }
    // Anything already inside the viewport on mount reveals immediately.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      node.classList.add("is-visible");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);


  return ref;
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
  variant = "up",
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  variant?: "up" | "left" | "right" | "scale";
  blur?: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();
  const variantClass =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
        ? "reveal-right"
        : variant === "scale"
          ? "reveal-scale"
          : undefined;
  return (
    <As
      ref={ref}
      className={cn("reveal", blur && "reveal-blur", variantClass, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </As>
  );
}


export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
  bordered = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        bordered && "border-t border-border",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="wipe-underline mt-3 inline-block text-3xl font-semibold leading-[1.1] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </Reveal>
  );
}

export function Card({
  children,
  className,
  hover = true,
  spotlight = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  spotlight?: boolean;
}) {
  const onMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (!spotlight) return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }, [spotlight]);

  return (
    <div
      onMouseMove={onMove}
      className={cn(
        "rounded-xl border border-border bg-surface-1/60 p-6",
        spotlight && "spotlight",
        hover &&
          "transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong hover:bg-surface-1 hover:shadow-elevated",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Counts up to a numeric target once the element scrolls into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(value * eased);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {prefix}
      {display.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

/** Splits text into words that rise in sequence on mount. */
export function WordsRise({ text, className, start = 0 }: { text: string; className?: string; start?: number }) {
  const words = text.split(" ");
  return (
    <span className={cn("word-rise", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} style={{ "--i": index + start } as React.CSSProperties}>
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

/** Pointer-driven 3D tilt. Returns props to spread on the tilt container. */
export function useTilt(max = 6) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const rect = node.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(1400px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    },
    [max],
  );

  const onLeave = useCallback(() => {
    const node = ref.current;
    if (node) node.style.transform = "perspective(1400px) rotateX(0deg) rotateY(0deg)";
  }, []);

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}
