import { Building2, Layers, Smartphone, Store } from "lucide-react";
import { Card, Reveal, Section, SectionHeading } from "./primitives";

const audiences = [
  {
    icon: Layers,
    title: "Marketplaces",
    body: "Split payouts across thousands of sellers, with per-seller settlement records and KYB status in one list.",
  },
  {
    icon: Building2,
    title: "PSPs & acquirers",
    body: "Give your own merchants a branded operations view instead of building and maintaining one internally.",
  },
  {
    icon: Smartphone,
    title: "Fintech apps",
    body: "Wallet top-ups, transfers and QR collection behind a single API, with the ledger view your ops team needs.",
  },
  {
    icon: Store,
    title: "Enterprise merchants",
    body: "Consolidate multiple processors and regions into one authorization, dispute and reconciliation picture.",
  },
];

export function UseCases() {
  return (
    <Section id="use-cases" bordered>
      <SectionHeading
        eyebrow="Who it's for"
        title="Built for teams where payments are the product."
        description="If money moves through your platform and someone has to answer for it on Monday morning, QloudPay is for you."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((audience, index) => (
          <Reveal key={audience.title} delay={index * 70}>
            <Card className="h-full">
              <audience.icon aria-hidden="true" className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{audience.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{audience.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
