import { Reveal, Section, SectionHeading } from "./primitives";

const steps = [
  {
    step: "01",
    title: "Connect",
    body: "Drop in your API keys and point your processors and wallets at QloudPay. No migration of stored payment data.",
  },
  {
    step: "02",
    title: "Configure",
    body: "Set merchant hierarchy, settlement schedules, risk thresholds and webhook endpoints from the console.",
  },
  {
    step: "03",
    title: "Go live",
    body: "Move from sandbox to production keys once your test flows pass. Traffic can be ramped by percentage.",
  },
  {
    step: "04",
    title: "Operate",
    body: "Your team monitors, reconciles and resolves in one place — with alerts instead of morning exports.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" bordered>
      <SectionHeading
        eyebrow="How it works"
        title="Live in four steps, not four quarters."
        description="Most teams run their first sandbox transaction on day one and switch production traffic within two weeks."
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((item, index) => (
          <li key={item.step} className="bg-surface-1/60">
            <Reveal delay={index * 70} className="h-full p-6">
              <span className="font-mono text-xs text-primary">{item.step}</span>
              <h3 className="mt-3 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
