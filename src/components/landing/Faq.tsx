import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, Section, SectionHeading } from "./primitives";

export const faqs = [
  {
    q: "How long does implementation actually take?",
    a: "Sandbox keys are issued during onboarding and most teams run their first test transaction the same day. Production go-live typically lands between one and three weeks, depending on how many processors and merchant accounts you're consolidating.",
  },
  {
    q: "How much engineering work is the integration?",
    a: "One REST API and one webhook endpoint. If you already have a payment intent flow, you're mostly mapping fields. QR payments, wallets and settlements reuse the same integration rather than adding new ones.",
  },
  {
    q: "Do we have to migrate away from our current processor?",
    a: "No. QloudPay sits above your processing relationships and normalises events from them. You keep your existing acquiring contracts and rails.",
  },
  {
    q: "How is our payment data secured?",
    a: "Card data is tokenised and we're PCI DSS Level 1 certified, SOC 2 Type II audited and ISO 27001 certified. Data is encrypted with TLS 1.3 in transit and AES-256 at rest, with per-tenant key isolation and full audit logging.",
  },
  {
    q: "Can we choose where our data is stored?",
    a: "Yes. We run regional deployments in the EU, UK, US and Middle East, and your workspace is pinned to the region you select at onboarding.",
  },
  {
    q: "Is there a sandbox before we commit?",
    a: "Every early access workspace starts in sandbox with realistic test data, simulated settlements and webhook replay, so your team can evaluate the workflow before any production traffic.",
  },
  {
    q: "What does support look like?",
    a: "A shared channel with payment engineers rather than a ticket queue, plus an on-call escalation path for production incidents. Onboarding includes a technical walkthrough with your team.",
  },
];

export function Faq() {
  return (
    <Section id="faq" bordered>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions we get before every rollout."
          description="Still missing something? Ask during onboarding — we'd rather answer it early."
        />

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.q} value={`item-${index}`} className="border-border">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
