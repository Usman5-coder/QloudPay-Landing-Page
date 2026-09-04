import { Container, Reveal } from "./primitives";

const companies = ["Atlas Coffee", "Riverstone Bank", "Orbit Travel", "Vertex Apparel", "Brightline", "Solace"];

export function TrustBar() {
  return (
    <div className="border-y border-border py-10">
      <Container>
        <Reveal>
          <p className="text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by payment operations teams at
          </p>
          <div className="marquee-host mask-fade-x mt-6 overflow-hidden">
            <ul className="marquee-track flex w-max items-center gap-x-12 sm:gap-x-16">
              {[...companies, ...companies].map((company, index) => (
                <li
                  key={`${company}-${index}`}
                  aria-hidden={index >= companies.length ? true : undefined}
                  className="font-display whitespace-nowrap text-base font-semibold tracking-tight text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {company}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            <span className="font-mono tabular text-foreground">$4.2B</span> processed annually ·{" "}
            <span className="font-mono tabular text-foreground">1,284</span> active merchants ·{" "}
            <span className="font-mono tabular text-foreground">99.99%</span> platform uptime
          </p>
        </Reveal>
      </Container>
    </div>
  );
}
