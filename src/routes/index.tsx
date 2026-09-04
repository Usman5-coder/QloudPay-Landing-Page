import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { TrustBar } from "@/components/landing/TrustBar";
import { ProblemSolution } from "@/components/landing/ProblemSolution";
import { Benefits } from "@/components/landing/Benefits";
import { Showcase } from "@/components/landing/Showcase";
import { HowItWorks } from "@/components/landing/HowItWorks";

import { UseCases } from "@/components/landing/UseCases";
import { Comparison } from "@/components/landing/Comparison";
import { Faq, faqs } from "@/components/landing/Faq";
import { FinalCta } from "@/components/landing/FinalCta";
import { Footer } from "@/components/landing/Footer";

const title = "QloudPay — Payment Operations Console for Fintech Teams";
const description =
  "Run transactions, QR payments, settlements, risk and webhooks in one real-time console. Built for PSPs, marketplaces and fintechs. Join early access.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "QloudPay",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          description,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface-2 focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <TrustBar />
        <ProblemSolution />
        <Benefits />
        <Showcase />
        <HowItWorks />
        
        <UseCases />
        <Comparison />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
