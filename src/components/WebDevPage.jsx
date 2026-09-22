import React from "react";
import {
  ShieldCheck,
  Zap,
  Sparkles,
  Server,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Globe2,
} from "lucide-react";
import PricingSection, { FadeUp } from "./PricingSection.jsx";
import Footer from "./Footer.jsx";

const stats = [
  { value: "OWASP-Aligned", label: "Hardening", sub: "Defensive Coding Standards" },
  { value: "Performance", label: "Optimized", sub: "Global Edge Acceleration" },
  { value: "Hardened", label: "Security", sub: "Strict Headers & Sanitization" },
  { value: "Reliable", label: "Cloud Deployment", sub: "Modern Infrastructure" },
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Zero-Trust Web Architecture",
    description:
      "Engineered from the ground up to eliminate attack vectors. Automated Content Security Policies (CSP), subresource integrity, strict sanitization, and OWASP Top 10 mitigation.",
    badge: "Security Core",
  },
  {
    icon: Zap,
    title: "Sub-Second Edge Performance",
    description:
      "Modern React, Vite, and Next.js engineering with global edge delivery, tree-shaken bundles, image optimization pipelines, and green Core Web Vitals across all viewports.",
    badge: "Speed & Scale",
  },
  {
    icon: Sparkles,
    title: "Bespoke UI/UX & Fluid Motion",
    description:
      "State-of-the-art visual aesthetics featuring glassmorphism, micro-animations via framer-motion, responsive semantic HTML, and intuitive user experiences that convert.",
    badge: "Aesthetics",
  },
  {
    icon: Server,
    title: "Hardened CI/CD & Deployment",
    description:
      "Automated continuous integration pipelines, cryptographic build verification, zero-downtime rolling releases, and turnkey compatibility with hardened cloud hosting.",
    badge: "DevOps",
  },
];

const steps = [
  {
    num: "01",
    title: "Threat Modeling & Architecture",
    desc: "We analyze your user journeys, data sensitivity, and functional goals to design a defense-in-depth web architecture.",
  },
  {
    num: "02",
    title: "High-Fidelity Interface Design",
    desc: "Interactive prototypes with dark-mode first palettes, glassmorphism, and responsive layouts tailored to your brand identity.",
  },
  {
    num: "03",
    title: "Hardened Clean-Code Engineering",
    desc: "Modular components built with React and Tailwind, fortified with strict security headers, sanitized state, and automated tests.",
  },
  {
    num: "04",
    title: "Edge Deployment & Continuous Audit",
    desc: "Automated deployment to high-availability global edge networks with continuous vulnerability scanning and telemetry.",
  },
];

export default function WebDevPage({ onContact, onLegal, onNavigateHome }) {
  return (
    <div className="min-h-screen bg-[#000000] text-foreground font-inter antialiased">
      {/* Top Secondary Sticky Navigation */}
      <div className="sticky top-[72px] z-40 border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateHome ? onNavigateHome() : (window.location.hash = "#home")}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={14} />
              <span>Back to Home</span>
            </button>
            <span className="text-white/20">/</span>
            <span className="text-xs font-medium text-foreground/90 uppercase tracking-wider">
              Web Development & Pricing
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#pricing"
              className="text-xs text-foreground/70 hover:text-white transition-colors hidden sm:inline-block"
            >
              Pricing Plans
            </a>
            <a
              href="#architecture"
              className="text-xs text-foreground/70 hover:text-white transition-colors hidden sm:inline-block"
            >
              Architecture
            </a>
            <button
              type="button"
              onClick={() => onContact && onContact("Web Development Consultation")}
              className="rounded-full bg-white/10 hover:bg-white/20 border border-white/15 px-3.5 py-1 text-xs font-medium text-white transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <main className="relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[550px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),rgba(147,51,234,0.08),transparent_70%)] blur-[100px]" />

        {/* Hero Section */}
        <section className="relative px-4 pt-12 pb-8 sm:px-6 sm:pt-16 sm:pb-10">
          <div className="mx-auto max-w-5xl text-center">
            <FadeUp>
              <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-landing-surface px-3.5 py-1.5 text-xs text-foreground/85 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Security-First Full-Stack Web Development</span>
              </div>
            </FadeUp>

            <FadeUp delay={0.1}>
              <h1 className="text-4xl font-normal tracking-[-0.03em] leading-[1.08] text-foreground sm:text-5xl md:text-6xl">
                Bespoke digital experiences.
                <br />
                <span className="bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
                  Hardened by default.
                </span>
              </h1>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/60 sm:text-lg">
                We engineer modern, responsive web applications and landing pages that marry stunning high-fidelity aesthetics with zero-trust cyber resilience and lightning-fast edge performance.
              </p>
            </FadeUp>

            {/* Key Metrics Row */}
            <FadeUp delay={0.3}>
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-8">
                {stats.map((s, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-base sm:text-xl md:text-2xl font-medium tracking-tight text-white">
                      {s.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-400/90">
                      {s.label}
                    </div>
                    <div className="mt-0.5 text-[11px] text-foreground/45">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </section>

        {/* 1. PRICING SECTION — DIRECTLY ON THE PAGE */}
        <PricingSection onContact={onContact} />

        {/* Value Guarantee Strip */}
        <section className="border-t border-white/10 bg-white/[0.02] px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium text-sm">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  <span>Full Code Ownership</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                  You receive 100% clean source code with permissive rights and no recurring platform lock-in.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium text-sm">
                  <Zap size={18} className="text-indigo-400" />
                  <span>Edge Optimized</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                  Sub-second load times engineered for modern SEO algorithms and high customer conversion.
                </p>
              </div>
              <div className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-center md:justify-start gap-2 text-white font-medium text-sm">
                  <Lock size={18} className="text-violet-400" />
                  <span>Zero-Trust Security</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-foreground/60">
                  Built-in OWASP compliance, secure HTTP headers, and verified defensive architecture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ARCHITECTURE PILLARS GRID */}
        <section id="architecture" className="border-t border-white/10 bg-white/[0.015] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Architectural Standard
              </span>
              <h2 className="mt-3 text-3xl font-normal tracking-[-0.02em] text-foreground sm:text-4xl">
                Built to withstand modern threats and delight your users.
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-foreground/60 sm:text-base">
                Security is not an afterthought or an added plugin. Every component, API interaction, and asset delivery route is engineered under zero-trust defense principles.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] text-white">
                          <Icon size={20} strokeWidth={1.75} />
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-foreground/60">
                          {pillar.badge}
                        </span>
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/60">
                        {pillar.description}
                      </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-foreground/40 group-hover:text-foreground/80 transition-colors">
                      <span>Production verified</span>
                      <CheckCircle2 size={13} className="text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. DEVELOPMENT WORKFLOW */}
        <section className="border-t border-white/10 bg-white/[0.015] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/60">
                Execution Workflow
              </span>
              <h2 className="mt-3 text-3xl font-normal tracking-tight text-foreground sm:text-4xl">
                From architecture to continuous deployment.
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st) => (
                <div
                  key={st.num}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:border-white/20"
                >
                  <div className="text-2xl font-light text-foreground/30">{st.num}</div>
                  <h3 className="mt-4 text-base font-medium text-foreground">{st.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-foreground/60">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer onContact={onContact} onLegal={onLegal} />
    </div>
  );
}
