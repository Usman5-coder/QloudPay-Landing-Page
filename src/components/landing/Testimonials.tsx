import { Reveal, Section, SectionHeading } from "./primitives";

const testimonials = [
  {
    quote:
      "We used to spend the first two hours of every day reconciling exports. That work is gone — settlement batches match themselves and we only look at exceptions.",
    name: "Chi Trinh",
    role: "Head of Payment Operations, Riverstone Bank",
    initials: "CT",
    result: "Daily reconciliation cut from 2 hours to ~15 minutes",
  },
  {
    quote:
      "Our QR rollout was supposed to be a quarter of engineering work. We reused the same payment intent API and shipped it in three weeks.",
    name: "Amara Osei",
    role: "VP Engineering, Orbit Travel",
    initials: "AO",
    result: "QR live in 3 weeks, one integration",
  },
  {
    quote:
      "The webhook delivery log is the unglamorous feature that saved us. We now catch endpoint failures before merchants notice anything.",
    name: "Daniel Reyes",
    role: "Platform Lead, Vertex Apparel",
    initials: "DR",
    result: "Integration incidents down 60% quarter on quarter",
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials" bordered>
      <SectionHeading
        eyebrow="Customer stories"
        title="What changed for teams already running on QloudPay."
      />

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 70}>
            <figure className="flex h-full flex-col rounded-xl border border-border bg-surface-1/60 p-6">
              <blockquote className="text-sm leading-relaxed text-foreground/90">
                “{item.quote}”
              </blockquote>
              <p className="mt-5 rounded-md border border-border bg-surface-2/60 px-2.5 py-1.5 text-xs text-muted-foreground">
                {item.result}
              </p>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-xs font-medium text-primary-foreground"
                >
                  {item.initials}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium text-foreground">{item.name}</span>
                  <span className="block text-xs text-muted-foreground">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
