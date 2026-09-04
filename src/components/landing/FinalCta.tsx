import { ArrowRight, Clock3, KeyRound, ShieldCheck } from "lucide-react";
import { Container, Reveal } from "./primitives";
import { WaitlistForm } from "./WaitlistForm";

const assurances = [
  { icon: KeyRound, label: "Sandbox keys in under a day" },
  { icon: Clock3, label: "20-minute guided walkthrough" },
  { icon: ShieldCheck, label: "PCI DSS Level 1 · SOC 2 Type II" },
];

export function FinalCta() {
  return (
    <section
      id="waitlist"
      className="noise-overlay relative overflow-hidden border-t border-border py-24 sm:py-32"
    >
      {/* Layered glow: aurora wash + focused halo behind the card */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-aurora opacity-80" />
        <div className="mask-fade-b absolute inset-0 bg-tech-grid opacity-40" />
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[52rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-glow blur-3xl" />
      </div>

      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl">
          <div className="shimmer-border relative overflow-hidden rounded-3xl border border-border-strong bg-surface-1/70 p-8 text-center shadow-elevated backdrop-blur-xl sm:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-2/60 px-3.5 py-1.5 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
              Onboarding 12 teams this month
            </span>

            <h2 className="mt-6 text-3xl font-semibold leading-[1.06] tracking-tight sm:text-4xl lg:text-5xl">
              Stop reconciling.{" "}
              <span className="sheen">Start operating.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              We'll stand up a sandbox workspace shaped around your merchant hierarchy, so your team
              sees the real workflow on real-shaped data — not a demo reel.
            </p>

            <div className="mx-auto mt-9 max-w-xl text-left">
              <WaitlistForm
                id="final-waitlist"
                showCompany
                layout="stacked"
                buttonLabel="Request early access"
              />
            </div>

            <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground">
              {assurances.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <Icon aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
                  {label}
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              No card required, no sales sequence
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
