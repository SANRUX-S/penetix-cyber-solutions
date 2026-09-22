import { AnimatePresence, motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    name: "Cloud VPS Secure",
    eyebrow: "Starter Hardened",
    description:
      "Ideal for business websites, portals, and web applications needing hardened kernel isolation.",
    monthlyPrice: 49,
    yearlyPrice: 470,
    features: [
      "4 vCPU Cores (Dedicated Allocation)",
      "8 GB ECC Memory",
      "160 GB Enterprise NVMe Storage",
      "10 TB High-Speed Bandwidth",
      "Automated WAF & Daily Backups",
      "Free Let’s Encrypt Wildcard SSL",
      "Standard 99.95% Uptime SLA",
    ],
  },
  {
    name: "Dedicated Security Server",
    eyebrow: "Enterprise Recommended",
    description:
      "Bare-metal performance with hardware-level isolation for high-traffic and compliance-driven workloads.",
    monthlyPrice: 189,
    yearlyPrice: 1814,
    featured: true,
    features: [
      "8 Cores / 16 Threads AMD EPYC",
      "32 GB ECC DDR4 Memory",
      "500 GB RAID-1 NVMe Storage",
      "Unlimited High-Speed Clean Bandwidth",
      "Advanced Layer 7 DDoS Scrubbing",
      "Continuous Intrusion Detection (IDS/IPS)",
      "Dedicated IP & Hardware MFA Access",
      "Priority 99.99% Uptime SLA",
    ],
  },
  {
    name: "High-Availability Cluster",
    eyebrow: "Mission Critical",
    description:
      "Multi-node failover cluster designed for zero-downtime financial, healthcare, and enterprise apps.",
    monthlyPrice: 449,
    yearlyPrice: 4310,
    features: [
      "Multi-Region Load Balanced Cluster",
      "64 GB+ Distributed Memory",
      "Synchronous Real-Time Data Replication",
      "Global Anycast Network Routing",
      "Custom WAF Rule Engineering",
      "Automated Multi-Zone Disaster Recovery",
      "Dedicated Security Engineer Support",
      "99.999% High Availability SLA",
    ],
  },
];

const headingWords = "Hardened hosting plans for uncompromising security".split(" ");

export default function HostingPricingSection({ onContact }) {
  const [billing, setBilling] = useState("monthly");
  const isYearly = billing === "yearly";

  return (
    <section className="pricing-section-container relative isolate min-h-svh overflow-hidden bg-[#050509] px-4 py-10 text-white sm:px-6 lg:flex lg:items-center lg:py-8" id="pricing">
      {/* Background glow */}
      <div className="pricing-bg-glow pointer-events-none absolute inset-0 z-[-30] bg-[radial-gradient(circle_at_50%_-10%,rgba(124,92,255,0.42),transparent_42%),radial-gradient(circle_at_12%_78%,rgba(34,211,238,0.13),transparent_30%),radial-gradient(circle_at_88%_72%,rgba(217,70,239,0.14),transparent_32%)]" />

      {/* Background grid */}
      <div className="pricing-bg-grid pointer-events-none absolute inset-0 z-[-20] opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_84%)]" />

      {/* Animated halo */}
      <motion.div
        aria-hidden="true"
        className="pricing-halo pointer-events-none absolute left-1/2 top-[-19rem] z-[-10] h-[36rem] w-[70rem] -translate-x-1/2 rounded-[50%] border-[110px] border-violet-600/45 blur-[90px]"
        animate={{
          scale: [1, 1.06, 1],
          opacity: [0.65, 0.9, 0.65],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="pricing-inner mx-auto w-full max-w-6xl">
        <header className="pricing-header mx-auto mb-7 max-w-3xl text-center lg:mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="pricing-badge mx-auto mb-3 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-violet-100 backdrop-blur-xl"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Fortified Cloud Infrastructure</span>
          </motion.div>

          <h2 className="pricing-title flex flex-wrap justify-center gap-x-[0.24em] text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
            {headingWords.map((word, index) => (
              <span key={word} className="overflow-hidden pb-1">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.08 + index * 0.07,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.45 }}
            className="pricing-desc mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/55 sm:text-base"
          >
            High-performance hosting environments pre-configured with defensive hardening, strict isolation, and continuous threat monitoring.
          </motion.p>

          {/* Billing switch */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="billing-switch relative mx-auto mt-5 grid w-fit grid-cols-2 rounded-full border border-white/10 bg-black/45 p-1 shadow-2xl shadow-violet-950/30 backdrop-blur-xl"
          >
            {["monthly", "yearly"].map((cycle) => {
              const active = billing === cycle;

              return (
                <button
                  key={cycle}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setBilling(cycle)}
                  className="billing-btn relative z-10 min-w-28 rounded-full px-4 py-2 text-sm font-medium capitalize outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  {active && (
                    <motion.span
                      layoutId="billing-pill"
                      className="billing-pill-active absolute inset-0 z-[-1] rounded-full bg-gradient-to-b from-violet-500 to-indigo-600 shadow-[0_8px_25px_rgba(109,40,217,0.45)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 34,
                      }}
                    />
                  )}

                  <span className={active ? "text-white" : "text-white/55"}>
                    {cycle}
                  </span>

                  {cycle === "yearly" && (
                    <span className="billing-discount ml-1.5 text-[10px] text-emerald-300">
                      −20%
                    </span>
                  )}
                </button>
              );
            })}
          </motion.div>
        </header>

        {/* Pricing cards */}
        <div className="pricing-grid grid gap-4 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{
                opacity: 0,
                y: 26,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              transition={{
                delay: 0.55 + index * 0.12,
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className={`pricing-card group relative flex min-h-[390px] flex-col overflow-hidden rounded-[1.7rem] border p-5 backdrop-blur-xl sm:p-6 ${
                plan.featured
                  ? "is-featured border-violet-400/55 bg-gradient-to-b from-violet-500/20 via-white/[0.09] to-white/[0.055] shadow-[0_24px_90px_rgba(91,33,182,0.28)]"
                  : "border-white/10 bg-gradient-to-b from-white/[0.085] to-white/[0.035]"
              }`}
            >
              <div className="card-top-shine pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-70" />

              <div className="card-corner-blob pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl transition-transform duration-500 group-hover:scale-125" />

              {plan.featured && (
                <div className="card-featured-badge absolute right-4 top-4 rounded-full border border-violet-300/20 bg-violet-400/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-100">
                  Most popular
                </div>
              )}

              <div className="relative">
                <p className="card-eyebrow mb-2 text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  {plan.eyebrow}
                </p>

                <h3 className="card-name text-2xl font-semibold tracking-tight">
                  {plan.name}
                </h3>

                <p className="card-desc mt-2 min-h-12 text-sm leading-5 text-white/50">
                  {plan.description}
                </p>
              </div>

              {/* Animated price */}
              <div className="card-price-row relative mt-5 flex items-end gap-1">
                <span className="price-currency mb-1 text-xl font-medium text-white/70">
                  $
                </span>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={`${plan.name}-${billing}`}
                    initial={{
                      y: 10,
                      opacity: 0,
                      filter: "blur(5px)",
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      y: -10,
                      opacity: 0,
                      filter: "blur(5px)",
                    }}
                    transition={{ duration: 0.2 }}
                    className="price-number text-5xl font-semibold tracking-[-0.06em]"
                  >
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </motion.span>
                </AnimatePresence>

                <span className="price-period mb-1.5 text-sm text-white/40">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  onContact &&
                  onContact(
                    `Hosting Plan: ${plan.name} (${
                      isYearly ? `$${plan.yearlyPrice}/yr` : `$${plan.monthlyPrice}/mo`
                    })`
                  )
                }
                className={`card-action-btn relative mt-5 w-full overflow-hidden rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                  plan.featured
                    ? "is-featured-btn border-violet-400/60 bg-gradient-to-b from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-950/40 hover:brightness-110"
                    : "border-white/10 bg-white/[0.07] text-white hover:border-white/20 hover:bg-white/[0.11]"
                }`}
              >
                Start with {plan.name}
              </button>

              <div className="card-features-block mt-5 border-t border-white/10 pt-5">
                <p className="card-features-title mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
                  What is included
                </p>

                <ul className="card-features-list space-y-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="feature-item flex items-start gap-2.5 text-sm text-white/60"
                    >
                      <span className="feature-icon-bullet mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-white/10 text-violet-200">
                        <Check
                          className="h-2.5 w-2.5"
                          strokeWidth={3}
                        />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
