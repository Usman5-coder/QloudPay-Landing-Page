import { Check, Minus } from "lucide-react";
import { Reveal, Section, SectionHeading } from "./primitives";

const rows = [
  { axis: "Time to first insight", stitched: "Weeks of internal dashboard work", qloudpay: "Same day, out of the box" },
  { axis: "Settlement visibility", stitched: "Bank file, next business day", qloudpay: "Live batch state and expected payout" },
  { axis: "Risk review", stitched: "Separate tool, manual cross-reference", qloudpay: "Attached to the transaction record" },
  { axis: "Webhook failures", stitched: "Found by the merchant", qloudpay: "Alerted, logged and replayable" },
  { axis: "Support model", stitched: "Ticket queue", qloudpay: "Shared channel with payment engineers" },
];

export function Comparison() {
  return (
    <Section id="why-qloudpay" bordered>
      <SectionHeading
        eyebrow="Why QloudPay"
        title="The alternative is building this yourself."
        description="Most teams end up with a gateway, a BI dashboard, a fraud tool and a spreadsheet. Here's what changes when it's one system."
      />

      <Reveal className="mt-12 overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">QloudPay compared with a stitched-together payment tooling stack</caption>
          <thead>
            <tr className="bg-surface-2/60 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Capability</th>
              <th scope="col" className="px-4 py-3 font-medium sm:px-6">Stitched-together stack</th>
              <th scope="col" className="px-4 py-3 font-medium text-foreground sm:px-6">QloudPay</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.axis} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-4 text-left font-medium text-foreground sm:px-6">
                  {row.axis}
                </th>
                <td className="px-4 py-4 text-muted-foreground sm:px-6">
                  <span className="flex gap-2">
                    <Minus aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground/70" />
                    {row.stitched}
                  </span>
                </td>
                <td className="px-4 py-4 text-foreground sm:px-6">
                  <span className="flex gap-2">
                    <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {row.qloudpay}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>
    </Section>
  );
}
