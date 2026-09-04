import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().min(1, "Enter your work email.").email("That doesn't look like a valid email."),
  company: z.string().max(80, "Company name is too long.").optional(),
});

type Status = "idle" | "submitting" | "success";

export function WaitlistForm({
  className,
  layout = "inline",
  buttonLabel = "Get early access",
  showCompany = false,
  id = "waitlist",
}: {
  className?: string;
  layout?: "inline" | "stacked";
  buttonLabel?: string;
  showCompany?: boolean;
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<{ email?: string | undefined; company?: string | undefined }>({});

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = schema.safeParse({ email, company: company || undefined });
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors({ email: flat.email?.[0], company: flat.company?.[0] });
      return;
    }
    setErrors({});
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex items-start gap-3 rounded-xl border border-border bg-surface-1/70 px-4 py-3.5 text-left",
          className,
        )}
      >
        <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="text-sm font-medium text-foreground">You're on the list.</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            We'll email <span className="font-mono text-foreground">{email}</span> when your sandbox
            workspace is ready — usually within two business days.
          </p>
        </div>
      </div>
    );
  }

  const emailErrorId = `${id}-email-error`;
  const companyErrorId = `${id}-company-error`;
  const busy = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div
        className={cn(
          "grid gap-2.5",
          layout === "inline" ? "sm:grid-cols-[minmax(0,1fr)_auto]" : "grid-cols-1",
        )}
      >
        <div className="min-w-0">
          <label htmlFor={`${id}-email`} className="sr-only">
            Work email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@company.com"
            value={email}
            disabled={busy}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? emailErrorId : undefined}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            className={cn(
              "h-11 w-full rounded-lg border bg-surface-1/80 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60",
              errors.email ? "border-danger" : "border-input",
            )}
          />
        </div>

        {showCompany ? (
          <div className="min-w-0">
            <label htmlFor={`${id}-company`} className="sr-only">
              Company (optional)
            </label>
            <input
              id={`${id}-company`}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Company (optional)"
              value={company}
              disabled={busy}
              aria-invalid={errors.company ? true : undefined}
              aria-describedby={errors.company ? companyErrorId : undefined}
              onChange={(event) => setCompany(event.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-surface-1/80 px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
            />
          </div>
        ) : null}

        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-primary px-5 text-sm font-medium text-primary-foreground ring-glow transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-70"
        >
          {busy ? (
            <>
              <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            <>
              {buttonLabel}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {errors.email ? (
        <p id={emailErrorId} role="alert" className="mt-2 text-xs text-danger">
          {errors.email}
        </p>
      ) : null}
      {errors.company ? (
        <p id={companyErrorId} role="alert" className="mt-1 text-xs text-danger">
          {errors.company}
        </p>
      ) : null}
    </form>
  );
}
