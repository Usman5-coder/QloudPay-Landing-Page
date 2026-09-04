import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "./primitives";
import { ThemeToggle } from "./ThemeToggle";


const links = [
  { href: "#product", label: "Product" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#faq", label: "FAQ" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl">
        <img src="/images/qloudpay-logo.png" alt="QloudPay" className="h-full w-full object-contain" />
      </span>
      <span className="font-display text-base font-semibold tracking-tight">QloudPay</span>
    </span>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        "relative",
        scrolled ? "border-b border-border glass" : "border-b border-transparent",
      )}
    >
      <Container>
        <div
          className={cn(
            "flex items-center justify-between gap-4 transition-[height] duration-300",
            scrolled ? "h-14" : "h-16",
          )}
        >
          <a
            href="#top"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="QloudPay home"
          >
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a

              href="#waitlist"
              className="hidden h-9 items-center rounded-lg bg-gradient-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
            >
              Get early access
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open ? (
          <nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-border py-4 md:hidden"
          >
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-1 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-lg bg-gradient-primary px-4 text-sm font-medium text-primary-foreground"
            >
              Get early access
            </a>
          </nav>
        ) : null}
      </Container>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-primary transition-transform duration-150 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>
  );
}
