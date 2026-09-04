import { AlertTriangle, Check } from "lucide-react";
import { Section, SectionHeading, Reveal } from "./primitives";

const rows = [
  {
    problem: "Reconciliation runs on exported CSVs stitched together by hand every morning.",
    solution: "Automated matching across processors, wallets and QR rails.",
    outcome: "Books close the same day, not three days later.",
  },
  {
    problem: "Settlement windows are a black box until the money lands — or doesn't.",
    solution: "Live settlement batches with expected payout time and rolling balance.",
    outcome: "No more merchant tickets asking where their money is.",
  },
  {
    problem: "Risk signals live in one tool, transactions in another, disputes in a third.",
    solution: "Risk flags attached to the transaction record your team already opens.",
    outcome: "Fraud reviewed in one screen instead of four.",
  },
  {
    problem: "Failed webhooks are discovered when a customer complains.",
    solution: "Delivery logs, retry state and alerting on every endpoint.",
    outcome: "Integration breakage caught in minutes, not weeks.",
  },
];

export function ProblemSolution() {
  return (
    <Section id="problem" bordered>
      <SectionHeading
        eyebrow="The problem"
        title="Payment operations break at the seams, not in the code."
        description="Most teams don't lose money on the payment itself. They lose it in the hours spent reconciling, chasing settlements and reverse-engineering what happened after the fact."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-2 lg:gap-8">
        <div className="space-y-3">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-medium text-danger">
              <AlertTriangle aria-hidden="true" className="h-4 w-4" />
              Today
            </p>
          </Reveal>
          {rows.map((row, index) => (
            <Reveal key={row.problem} delay={index * 60}>
              <div className="rounded-xl border border-border bg-surface-1/40 p-5">
                <p className="text-sm leading-relaxed text-muted-foreground">{row.problem}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="space-y-3">
          <Reveal>
            <p className="flex items-center gap-2 text-sm font-medium text-success">
              <Check aria-hidden="true" className="h-4 w-4" />
              With QloudPay
            </p>
          </Reveal>
          {rows.map((row, index) => (
            <Reveal key={row.solution} delay={index * 60}>
              <div className="rounded-xl border border-border bg-surface-1/70 p-5 transition-colors duration-300 hover:border-border-strong">
                <p className="text-sm font-medium leading-relaxed text-foreground">{row.solution}</p>
                <p className="mt-2 text-sm text-muted-foreground">{row.outcome}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
