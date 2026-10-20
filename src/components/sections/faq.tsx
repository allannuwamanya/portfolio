"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { faqData } from "@/data/faq";
import { fadeUp } from "@/lib/animations";

/** Plain visible Q&A, so readers, search engines and AI answer engines all see the same text. */
export function FaqSection() {
  return (
    <section aria-labelledby="faq-heading" className="relative overflow-hidden border-t border-border/60 py-28">
      <div className="container relative z-10 max-w-6xl">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14"
        >
          <p className="mb-3 font-mono text-sm uppercase tracking-wider text-accent">Questions</p>
          <h2 id="faq-heading" className="text-4xl font-black tracking-tight sm:text-5xl">
            Quick <span className="gradient-text">answers</span>
          </h2>
        </motion.div>

        <dl className="grid gap-x-14 gap-y-10 md:grid-cols-2">
          {faqData.map((item, i) => {
            const external = item.link.href.startsWith("http");
            return (
              <motion.div
                key={item.question}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="flex flex-col gap-3 border-t border-border/60 pt-5"
              >
                <dt>
                  <h3 className="text-lg font-black leading-snug text-foreground">{item.question}</h3>
                </dt>
                <dd className="flex flex-col gap-3">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{item.answer}</p>
                  <Link
                    href={item.link.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex w-fit items-center gap-1.5 text-sm font-bold text-accent hover:underline"
                  >
                    {item.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
