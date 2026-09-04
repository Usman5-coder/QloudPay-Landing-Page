import type { ReactNode } from "react";
import { Reveal, Section, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface-1/70 shadow-elevated",
        className,
      )}
    >
      {children}
    </div>
  );
}

function PanelHeader({ title, meta }: { title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <p className="text-sm font-medium">{title}</p>
      {meta ? (
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-[0.6875rem] text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          {meta}
        </span>
      ) : null}
    </div>
  );
}

const transactions = [
  { id: "tx_11ib4", merchant: "Solace Wellness", method: "WALLET", status: "succeeded", amount: "GBP 2,661.68" },
  { id: "tx_11ib5", merchant: "Riverstone Bank", method: "WALLET", status: "pending", amount: "AED 7,118.86" },
  { id: "tx_11ib6", merchant: "Orbit Travel", method: "CARD", status: "succeeded", amount: "GBP 3,134.62" },
  { id: "tx_11ib7", merchant: "Atlas Coffee Co.", method: "QR", status: "succeeded", amount: "USD 1,420.00" },
];

function ConsolePanel() {
  return (
    <Panel>
      <PanelHeader title="Recent transactions" meta="Live" />
      <table className="w-full text-left text-xs">
        <caption className="sr-only">Example transaction list from the QloudPay console</caption>
        <thead>
          <tr className="text-[0.625rem] uppercase tracking-[0.14em] text-muted-foreground">
            <th scope="col" className="px-4 py-2.5 font-medium">ID</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Merchant</th>
            <th scope="col" className="hidden px-4 py-2.5 font-medium sm:table-cell">Method</th>
            <th scope="col" className="px-4 py-2.5 font-medium">Status</th>
            <th scope="col" className="px-4 py-2.5 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody className="font-mono">
          {transactions.map((row) => (
            <tr key={row.id} className="border-t border-border">
              <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
              <td className="px-4 py-3 font-sans text-foreground">{row.merchant}</td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{row.method}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 font-sans text-[0.6875rem]",
                    row.status === "succeeded"
                      ? "bg-success-soft text-success"
                      : "bg-warning-soft text-warning",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      row.status === "succeeded" ? "bg-success" : "bg-warning",
                    )}
                  />
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3 text-right tabular text-foreground">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Panel>
  );
}

const QR_SIZE = 25;

function buildQrModules(): Uint8Array {
  const grid = new Uint8Array(QR_SIZE * QR_SIZE);
  const reserved = new Uint8Array(QR_SIZE * QR_SIZE);
  const at = (y: number, x: number) => y * QR_SIZE + x;

  const drawFinder = (row: number, col: number) => {
    for (let r = -1; r <= 7; r += 1) {
      for (let c = -1; c <= 7; c += 1) {
        const y = row + r;
        const x = col + c;
        if (y < 0 || x < 0 || y >= QR_SIZE || x >= QR_SIZE) continue;
        reserved[at(y, x)] = 1;
        const ring = Math.max(Math.abs(r - 3), Math.abs(c - 3));
        const on = r >= 0 && c >= 0 && r <= 6 && c <= 6 && (ring === 3 || ring <= 1);
        grid[at(y, x)] = on ? 1 : 0;
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, QR_SIZE - 7);
  drawFinder(QR_SIZE - 7, 0);

  // alignment pattern
  const ay = QR_SIZE - 9;
  const ax = QR_SIZE - 9;
  for (let r = 0; r < 5; r += 1) {
    for (let c = 0; c < 5; c += 1) {
      reserved[at(ay + r, ax + c)] = 1;
      const ring = Math.max(Math.abs(r - 2), Math.abs(c - 2));
      grid[at(ay + r, ax + c)] = ring === 1 ? 0 : 1;
    }
  }

  // timing patterns
  for (let i = 8; i < QR_SIZE - 8; i += 1) {
    const on = i % 2 === 0 ? 1 : 0;
    grid[at(6, i)] = on;
    reserved[at(6, i)] = 1;
    grid[at(i, 6)] = on;
    reserved[at(i, 6)] = 1;
  }

  // deterministic pseudo-random data modules
  let seed = 0x51704d;
  for (let i = 0; i < grid.length; i += 1) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    if (!reserved[i]) grid[i] = (seed >> 16) & 1;
  }

  return grid;
}

const QR_MODULES = buildQrModules();

function QrMatrix() {
  return (
    <svg
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
      role="img"
      aria-label="Example dynamic payment QR code"
      className="h-full w-full"
      shapeRendering="crispEdges"
    >
      <rect width={QR_SIZE} height={QR_SIZE} fill="#ffffff" />
      {Array.from(QR_MODULES).map((filled, index) =>
        filled ? (
          <rect
            key={index}
            x={index % QR_SIZE}
            y={Math.floor(index / QR_SIZE)}
            width={1}
            height={1}
            fill="#0b0d10"
          />
        ) : null,
      )}
    </svg>
  );
}

function QrPanel() {
  return (
    <Panel>
      <PanelHeader title="QR payment · qr_d12" meta="Scanned" />
      <div className="grid gap-5 p-5 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="h-32 w-32 rounded-lg border border-border bg-white p-2 shadow-elevated">
          <QrMatrix />
        </div>
        <dl className="space-y-2.5 text-xs">
          {[
            ["Merchant", "Vertex Apparel"],
            ["Amount", "AED 340.00"],
            ["Rail", "Dynamic QR · reusable"],
            ["Converted", "12s after scan"],
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 border-b border-border pb-2 last:border-0">
              <dt className="text-muted-foreground">{label}</dt>
              <dd className="font-mono text-foreground">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}

const deliveries = [
  { event: "checkout.completed", code: "200", ms: "82ms", ok: true },
  { event: "payment.captured", code: "200", ms: "104ms", ok: true },
  { event: "settlement.initiated", code: "500", ms: "retry 2/5", ok: false },
  { event: "merchant.approved", code: "200", ms: "71ms", ok: true },
];

function WebhookPanel() {
  return (
    <Panel>
      <PanelHeader title="Webhook deliveries" meta="EU-West" />
      <ul className="divide-y divide-border">
        {deliveries.map((item) => (
          <li key={item.event} className="flex items-center justify-between gap-3 px-4 py-3">
            <span className="min-w-0 truncate font-mono text-xs text-foreground">{item.event}</span>
            <span className="flex shrink-0 items-center gap-2">
              <span className="font-mono text-[0.6875rem] text-muted-foreground">{item.ms}</span>
              <span
                className={cn(
                  "rounded-md px-2 py-0.5 font-mono text-[0.6875rem]",
                  item.ok ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
                )}
              >
                {item.code}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

const features = [
  {
    eyebrow: "Operations console",
    title: "Every payment, searchable in one second.",
    what: "A single ledger view across cards, wallets and QR, with merchant, method and status filters.",
    how: "Events stream in from the processing layer and are normalised into one transaction record.",
    why: "Support answers a customer question without opening a second tool or asking engineering.",
    panel: <ConsolePanel />,
  },
  {
    eyebrow: "QR payments engine",
    title: "Static and dynamic QR, without a new integration.",
    what: "Generate reusable or amount-locked QR codes per merchant, terminal or campaign.",
    how: "Each code maps to the same payment intent API your card flow already uses.",
    why: "Launch in-person and offline collection without building a second payment stack.",
    panel: <QrPanel />,
  },
  {
    eyebrow: "Webhooks & API",
    title: "Know a webhook failed before your merchant does.",
    what: "Delivery logs, response codes, latency and automatic retries for every endpoint.",
    how: "Signed events with idempotency keys, replayable from the dashboard or the API.",
    why: "Integration issues surface as alerts instead of support escalations.",
    panel: <WebhookPanel />,
  },
];

export function Showcase() {
  return (
    <Section id="product" bordered>
      <SectionHeading
        eyebrow="Product"
        title="A console built for the people who run payments."
        description="Not an analytics dashboard bolted onto a gateway — the day-to-day surface your operations, risk and engineering teams actually work in."
      />

      <div className="mt-14 space-y-16 sm:space-y-24">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <Reveal className={cn(index % 2 === 1 && "lg:order-2")}>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-primary">
                {feature.eyebrow}
              </p>
              <h3 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">{feature.title}</h3>
              <dl className="mt-6 space-y-4 text-sm">
                {[
                  ["What it does", feature.what],
                  ["How it works", feature.how],
                  ["Why it matters", feature.why],
                ].map(([label, value]) => (
                  <div key={label} className="border-l border-border pl-4">
                    <dt className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                    <dd className="mt-1 leading-relaxed text-foreground/90">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={80} className={cn(index % 2 === 1 && "lg:order-1")}>
              {feature.panel}
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
