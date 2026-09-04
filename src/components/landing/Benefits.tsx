import { Activity, Code2, Landmark, ShieldCheck } from "lucide-react";
import { Card, Reveal, Section, SectionHeading } from "./primitives";

const benefits = [
  {
    icon: Activity,
    title: "Real-time visibility",
    body: "Volume, authorization rate and failures update as they happen, per merchant and per method.",
    outcome: "Spot a broken rail in minutes",
  },
  {
    icon: Landmark,
    title: "Settlement on autopilot",
    body: "Batches are generated, matched and tracked from capture to bank credit without manual files.",
    outcome: "Same-day reconciliation",
  },
  {
    icon: ShieldCheck,
    title: "Risk built into the workflow",
    body: "Velocity rules, KYB status and dispute history sit on the transaction your analyst already opened.",
    outcome: "Fewer chargebacks, faster reviews",
  },
  {
    icon: Code2,
    title: "Developer-first by default",
    body: "One REST API, typed webhooks with replay, scoped keys and a sandbox that mirrors production.",
    outcome: "Integrate in days",
  },
];

export function Benefits() {
  return (
    <Section id="benefits" bordered>
      <SectionHeading
        eyebrow="Core benefits"
        title="Everything your payment team checks, in one place."
        description="Four capabilities that replace the spreadsheet-and-tabs workflow most teams run today."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {benefits.map((benefit, index) => (
          <Reveal key={benefit.title} delay={index * 70}>
            <Card className="h-full">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface-2">
                <benefit.icon aria-hidden="true" className="h-[1.15rem] w-[1.15rem] text-primary" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{benefit.body}</p>
              <p className="mt-4 inline-flex items-center rounded-md border border-border bg-surface-2/60 px-2 py-1 text-xs text-foreground">
                {benefit.outcome}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
