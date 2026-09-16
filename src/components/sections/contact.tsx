"use client";

import * as React from "react";
import { motion } from "motion/react";
import { Send, Github, Linkedin, Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { z } from "zod";
import { siteConfig } from "@/lib/constants";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactForm, string>>;

// Replace with your Formspree form ID: https://formspree.io/
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

const socialLinks = [
  { href: siteConfig.links.github, icon: Github, label: "GitHub", handle: "@allannuwamanya" },
  { href: siteConfig.links.linkedin, icon: Linkedin, label: "LinkedIn", handle: "in/allan-nuwamanya" },
  { href: `mailto:${siteConfig.links.email}`, icon: Mail, label: "Email", handle: siteConfig.links.email },
];

export function ContactSection() {
  const [form, setForm] = React.useState<ContactForm>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState<FieldErrors>({});
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((err) => ({ ...err, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      result.error.errors.forEach((err) => {
        const key = err.path[0] as keyof ContactForm;
        fieldErrors[key] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden bg-secondary/20">
      {/* Decorative BG number */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 select-none text-[20vw] font-black leading-none text-foreground/[0.025]"
      >
        07
      </div>

      <div className="container max-w-6xl relative z-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="font-mono text-sm text-accent mb-3 tracking-wider uppercase">07 / contact</p>
          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Let&apos;s <span className="gradient-text">work together</span>
          </h2>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2">
          <motion.div
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-col gap-6"
          >
            <p className="text-muted-foreground leading-relaxed">
              Whether you have a project in mind, a role you think I&apos;d be a great fit for, or just want to say hi — my inbox is always open.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m particularly excited about challenging full-stack problems, startups with strong missions, and open-source collaborations.
            </p>
            <div className="mt-2 space-y-3">
              {socialLinks.map(({ href, icon: Icon, label, handle }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-border bg-card p-4 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent/40 hover:bg-accent/5 hover:text-foreground"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  <span>{handle}</span>
                  <span className="ml-auto text-xs text-muted-foreground/50">{label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {status === "success" ? (
              <div className="bento-card flex flex-col items-center justify-center gap-4 py-16 text-center border-emerald-500/30">
                <CheckCircle className="h-12 w-12 text-emerald-400" />
                <h3 className="text-xl font-bold text-foreground">Message sent!</h3>
                <p className="text-muted-foreground text-sm">I&apos;ll get back to you as soon as possible.</p>
                <button onClick={() => setStatus("idle")} className="mt-2 text-sm text-accent hover:underline">
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bento-card flex flex-col gap-4" noValidate>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["name", "email"] as const).map((field) => (
                    <div key={field} className="flex flex-col gap-1.5">
                      <label htmlFor={field} className="text-xs font-medium text-muted-foreground capitalize">{field}</label>
                      <input
                        id={field} name={field}
                        type={field === "email" ? "email" : "text"}
                        value={form[field]} onChange={handleChange}
                        placeholder={field === "name" ? "Your name" : "your@email.com"}
                        className={cn(
                          "rounded-lg border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30",
                          errors[field] ? "border-destructive" : "border-border"
                        )}
                      />
                      {errors[field] && <p className="text-xs text-destructive">{errors[field]}</p>}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-muted-foreground">Subject</label>
                  <input
                    id="subject" name="subject" type="text"
                    value={form.subject} onChange={handleChange}
                    placeholder="What's it about?"
                    className={cn(
                      "rounded-lg border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30",
                      errors.subject ? "border-destructive" : "border-border"
                    )}
                  />
                  {errors.subject && <p className="text-xs text-destructive">{errors.subject}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-muted-foreground">Message</label>
                  <textarea
                    id="message" name="message" rows={5}
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or idea..."
                    className={cn(
                      "resize-none rounded-lg border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent/30",
                      errors.message ? "border-destructive" : "border-border"
                    )}
                  />
                  {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    Something went wrong. Please email me directly.
                  </div>
                )}

                <button
                  type="submit" disabled={status === "loading"}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-6 text-sm font-semibold text-accent-foreground transition-all hover:bg-accent/90 hover:shadow-glow disabled:opacity-60"
                >
                  {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  {status === "loading" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
