import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, LegalSection } from "@/components/landing/LegalPage";

const title = "Terms & Conditions — QloudPay";
const description =
  "The terms that govern access to the QloudPay payment operations console, early-access programme, and related services.";

export const Route = createFileRoute("/terms")({
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
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections = [
  {
    heading: "1. Agreement to these terms",
    body: [
      "By accessing the QloudPay website, joining the early-access waitlist, or using the payment operations console, you agree to these Terms & Conditions on behalf of yourself and any organisation you represent. If you do not agree, please do not use the service.",
    ],
  },
  {
    heading: "2. Early access and availability",
    body: [
      "QloudPay is currently offered as an early-access product. Features, limits, and interfaces may change, and access may be granted, paused, or withdrawn at our discretion. We aim for high availability but do not guarantee uninterrupted service during the early-access period.",
    ],
  },
  {
    heading: "3. Eligibility and account responsibilities",
    body: [
      "You must be authorised to act for your business and to accept these terms. You are responsible for keeping credentials, API keys, and webhook secrets confidential, for the activity of every user under your account, and for promptly notifying us of suspected unauthorised access.",
    ],
  },
  {
    heading: "4. Acceptable use",
    body: [
      "You agree not to use QloudPay for unlawful payments, fraud, money laundering, sanctioned activity, or any business prohibited by our acquiring and compliance partners. You may not attempt to reverse engineer, resell, overload, or probe the service for vulnerabilities without written permission.",
    ],
  },
  {
    heading: "5. Payments, fees, and settlement",
    body: [
      "Fees, settlement schedules, reserves, and chargeback handling are defined in your commercial order or pricing agreement. You remain responsible for the accuracy of transaction data you submit and for any refunds, disputes, or penalties arising from your transactions.",
    ],
  },
  {
    heading: "6. Compliance and data obligations",
    body: [
      "You agree to comply with applicable payment scheme rules, PCI DSS requirements, and local financial regulations. Personal data you route through QloudPay must be collected lawfully and shared with us only for processing purposes described in our Privacy Policy.",
    ],
  },
  {
    heading: "7. Intellectual property",
    body: [
      "QloudPay and its software, brand, documentation, and design remain our property. You receive a limited, revocable, non-exclusive right to use the service for your internal business operations during the term of your access.",
    ],
  },
  {
    heading: "8. Disclaimers and limitation of liability",
    body: [
      "The service is provided \"as is\" during early access. To the fullest extent permitted by law, we exclude implied warranties and are not liable for indirect, incidental, or consequential losses, including lost profits or lost data. Our aggregate liability is limited to the fees you paid in the twelve months before the claim.",
    ],
  },
  {
    heading: "9. Suspension and termination",
    body: [
      "Either party may end access at any time during early access. We may suspend an account immediately where we detect fraud, legal risk, scheme violations, or a threat to platform security.",
    ],
  },
  {
    heading: "10. Changes and contact",
    body: [
      "We may update these terms as the product evolves and will publish the revised version on this page. Continued use after an update constitutes acceptance. Questions can be sent to legal@qloudpay.com.",
    ],
  },
];

function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="2 September 2026"
      intro="These terms describe how you may use QloudPay's website, early-access programme, and payment operations console."
    >
      {sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading} body={section.body} />
      ))}
    </LegalPage>
  );
}
