import { ArrowDownRight, ShieldCheck, Zap } from "lucide-react";
import { Container, Counter, Reveal, WordsRise, useTilt } from "./primitives";
import { WaitlistForm } from "./WaitlistForm";

export function Hero() {
  const tilt = useTilt(5);
  const orbit = useTilt(10);

  return (
    <section
      id="top"
      className="noise-overlay relative overflow-hidden pb-16 pt-14 sm:pb-24 sm:pt-20"
    >
      {/* Layered futuristic backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[860px]">
        <div className="absolute inset-0 bg-aurora" />
        <div className="mask-fade-b absolute inset-0 bg-tech-grid opacity-70" />
        <div className="absolute inset-0 bg-gradient-glow" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-8">
          <div className="max-w-3xl">
          <Reveal>
            <span className="shimmer-border inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-3.5 py-1.5 text-xs text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              Early access now open · v2.4
            </span>
          </Reveal>

          <h1 className="mt-6 text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            <WordsRise text="Run payments like" />
            <br className="hidden sm:block" />{" "}
            <span className="word-rise">
              <span style={{ "--i": 3 } as React.CSSProperties}>
                <span className="sheen">infrastructure,</span>
              </span>
            </span>{" "}
            <WordsRise text="not spreadsheets." start={4} />
          </h1>

          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              QloudPay is the operations console for payment teams — transactions, QR payments,
              settlements, risk and webhooks in one real-time view. Built for PSPs, marketplaces and
              fintechs processing at scale.
            </p>
          </Reveal>

          <Reveal delay={180} className="mt-8">
            <WaitlistForm id="hero-waitlist" className="max-w-lg" />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5 text-success" />
                PCI DSS Level 1 · SOC 2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                Sandbox keys in under a day
              </span>
              <a
                href="#product"
                className="inline-flex items-center gap-1 rounded text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                See the platform
                <ArrowDownRight aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </Reveal>
          </div>

          <Reveal variant="scale" delay={220} className="relative hidden lg:block">
            <div
              ref={orbit.ref}
              onMouseMove={orbit.onMouseMove}
              onMouseLeave={orbit.onMouseLeave}
              className="relative transition-transform duration-500 ease-out will-change-transform"
            >
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-glow blur-2xl"
              />
              <img
                src="/images/hero-3d-payment.png"
                width={1024}
                height={1024}
                alt="Three-dimensional glass payment card surrounded by floating transaction tiles"
                className="animate-float-slow relative w-full max-w-md drop-shadow-[0_30px_60px_oklch(0.54_0.22_270/0.35)]"
              />
              <div
                className="glass absolute -left-6 top-10 rounded-xl border border-border px-3 py-2 shadow-elevated animate-float-slow"
                style={{ animationDelay: "1.6s" }}
              >
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Settled
                </p>
                <p className="font-mono text-sm font-medium tabular text-foreground">
                  <Counter value={18402} prefix="$" />
                </p>
              </div>
              <div
                className="glass absolute -right-4 bottom-12 rounded-xl border border-border px-3 py-2 shadow-elevated animate-float-slow"
                style={{ animationDelay: "0.8s" }}
              >
                <p className="flex items-center gap-1.5 text-[0.6875rem] font-medium text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                  Authorized in 210ms
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={240} variant="scale" className="relative z-10 mt-14 sm:mt-20">
          <div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            className="glow-under relative rounded-2xl transition-transform duration-500 ease-out will-change-transform"
          >
            <div className="shimmer-border relative overflow-hidden rounded-2xl border border-border-strong bg-surface-1/70 p-1.5 shadow-elevated backdrop-blur">
              <div className="flex items-center gap-1.5 px-3 py-2">
                <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
                <span className="ml-3 font-mono text-[0.6875rem] text-muted-foreground">
                  app.qloudpay.com/dashboard
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 text-[0.625rem] text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
                  Live
                </span>
              </div>

              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/images/hero-dashboard.png"
                  width={1897}
                  height={1078}
                  alt="QloudPay operations dashboard showing payment volume, success rate, pending settlement and a live activity feed"
                  className="w-full rounded-xl border border-border"
                />
                {/* Scanning light sweep */}
                <span
                  aria-hidden="true"
                  className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-transparent via-primary/15 to-transparent"
                />
              </div>
            </div>
          </div>

          <div className="animate-float-slow pointer-events-none absolute -left-2 bottom-8 hidden rounded-xl border border-border glass px-3.5 py-2.5 shadow-elevated sm:block">
            <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Volume today
            </p>
            <p className="font-mono text-sm font-medium tabular text-foreground">
              <Counter value={2481902} prefix="$" />
            </p>
          </div>
          <div
            className="animate-float-slow pointer-events-none absolute -right-2 top-24 hidden rounded-xl border border-border glass px-3.5 py-2.5 shadow-elevated sm:block"
            style={{ animationDelay: "1.2s" }}
          >
            <p className="flex items-center gap-1.5 text-xs font-medium text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              Payment captured
            </p>
            <p className="mt-0.5 font-mono text-[0.6875rem] text-muted-foreground">
              $1,420.00 · Atlas Coffee Co.
            </p>
          </div>
          <div
            className="animate-float-slow pointer-events-none absolute -right-4 bottom-16 hidden rounded-xl border border-border glass px-3.5 py-2.5 shadow-elevated lg:block"
            style={{ animationDelay: "2.4s" }}
          >
            <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Auth rate
            </p>
            <p className="font-mono text-sm font-medium tabular text-foreground">
              <Counter value={99.42} decimals={2} suffix="%" />
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
