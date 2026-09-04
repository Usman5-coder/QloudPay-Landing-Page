import { FileCheck2, Fingerprint, KeyRound, Lock, ScrollText } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const items = [
  { icon: FileCheck2, title: "PCI DSS Level 1", body: "Annual audit, tokenised card data, no raw PAN in your systems." },
  { icon: Fingerprint, title: "SOC 2 Type II", body: "Independently audited controls for security and availability." },
  { icon: ScrollText, title: "ISO 27001", body: "Certified information security management across the platform." },
  { icon: Lock, title: "Encryption everywhere", body: "TLS 1.3 in transit, AES-256 at rest, per-tenant key isolation." },
  { icon: KeyRound, title: "Scoped access", body: "Role-based permissions, scoped API keys and full audit logs." },
];

export function Security() {
  return (
    <Section id="security" bordered>
      <SectionHeading
        eyebrow="Security & compliance"
        title="Trust that survives your risk review."
        description="Compliance evidence, access controls and audit trails are part of the platform — not a paid add-on you request later."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item.title} delay={index * 60} className="bg-surface-1/60">
            <div className="h-full p-6">
              <item.icon aria-hidden="true" className="h-5 w-5 text-primary" />
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          </Reveal>
        ))}
        <Reveal delay={360} className="bg-surface-1/60">
          <div className="flex h-full flex-col justify-center p-6">
            <p className="text-sm font-medium text-foreground">Need our security pack?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Join early access and we'll share the full documentation set during onboarding.
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
