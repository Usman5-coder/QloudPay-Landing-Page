import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Container className="py-20">
          <Link
            to="/"
            className="font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Back to home
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 font-mono text-xs text-muted-foreground">Last updated {updated}</p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">{intro}</p>
          <div className="mt-12 max-w-2xl space-y-10">{children}</div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ heading, body }: { heading: string; body: string[] }) {
  return (
    <section>
      <h2 className="font-sans text-base font-medium text-foreground">{heading}</h2>
      {body.map((paragraph) => (
        <p key={paragraph} className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
