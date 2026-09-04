import { Link } from "@tanstack/react-router";
import { Container } from "./primitives";
import { Logo } from "./Nav";

type FooterLink = { label: string; href?: string; to?: "/terms" | "/privacy" };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Operations console", href: "#product" },
      { label: "QR payments", href: "#product" },
      { label: "Webhooks & API", href: "#product" },
      { label: "How it works", href: "#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Who it's for", href: "#use-cases" },
      { label: "Why QloudPay", href: "#why-qloudpay" },
    ],
  },
  {
    title: "Trust",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Early access", href: "#waitlist" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,2fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The payment operations console for teams where money movement is the product.
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {link.to ? (
                        <Link
                          to={link.to}
                          className="rounded text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="rounded text-sm text-foreground/80 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} QloudPay. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/terms" className="transition-colors hover:text-foreground">
              Terms & Conditions
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy Policy
            </Link>
            <span>PCI DSS Level 1 · SOC 2 Type II · ISO 27001</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
