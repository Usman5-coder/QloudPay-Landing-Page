import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/landing/LegalPage";

const title = "Privacy Policy — QloudPay";
const description =
  "How QloudPay collects, uses, and protects personal and transaction data across its payment operations console and early-access waitlist.";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    heading: "1. Data we collect",
    body: [
      "We collect contact details you submit to the early-access waitlist (such as name, work email, and company), account and usage data generated when you use the console, and technical data such as IP address, device type, and browser information.",
      "When you process payments through QloudPay, we handle transaction metadata provided by you or your customers, including amounts, currencies, references, and risk signals.",
    ],
  },
  {
    heading: "2. How we use your data",
    body: [
      "We use data to provide and secure the service, review early-access requests, detect fraud and abuse, meet legal and payment-scheme obligations, improve product performance, and send service or product updates you can opt out of at any time.",
    ],
  },
  {
    heading: "3. Legal bases",
    body: [
      "Depending on your jurisdiction, we rely on contractual necessity to deliver the service, legitimate interests for security and product improvement, legal obligation for financial and anti-money-laundering compliance, and consent for optional marketing communication.",
    ],
  },
  {
    heading: "4. Sharing with third parties",
    body: [
      "We share data only where necessary: with infrastructure and analytics providers acting as processors under contract, with banking, acquiring, and compliance partners required to move funds, and with authorities when legally compelled. We do not sell personal data.",
    ],
  },
  {
    heading: "5. Security",
    body: [
      "Data is encrypted in transit and at rest, access is scoped by role and reviewed regularly, and sensitive operations are logged with an immutable audit trail. Our controls are aligned with PCI DSS Level 1, SOC 2 Type II, and ISO 27001 practices.",
    ],
  },
  {
    heading: "6. Retention",
    body: [
      "We keep personal data only as long as needed for the purposes described here. Financial and transaction records are retained for the periods required by applicable regulation, after which they are deleted or irreversibly anonymised.",
    ],
  },
  {
    heading: "7. International transfers",
    body: [
      "Where data is transferred outside your region, we use recognised safeguards such as standard contractual clauses and additional technical measures to protect it.",
    ],
  },
  {
    heading: "8. Your rights",
    body: [
      "Subject to local law, you may request access, correction, deletion, restriction, portability, or object to certain processing, and you may withdraw marketing consent at any time. Send requests to privacy@qloudpay.com and we will respond within the statutory timeframe.",
    ],
  },
  {
    heading: "9. Cookies",
    body: [
      "We use essential cookies to keep the console secure and functional, and limited analytics cookies to understand product usage. You can control non-essential cookies through your browser settings.",
    ],
  },
  {
    heading: "10. Changes and contact",
    body: [
      "We will publish any updates to this policy on this page with a revised date. For privacy questions or to reach our data protection contact, email privacy@qloudpay.com.",
    ],
  },
];

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="2 September 2026"
      intro="This policy explains what data QloudPay collects, why we process it, and the controls you have over it."
    >
      {sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading} body={section.body} />
      ))}
    </LegalPage>
  );
}
