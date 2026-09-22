import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ShieldCheck, Sparkles, Layers, Cpu, Code2, Server, Globe, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// 1. MIcon Helper Component
export function MIcon({
  name,
  size = 20,
  weight = 400,
  fill = 0,
  grade = 0,
  opticalSize = 24,
  className,
}) {
  return (
    <span
      className={cn("material-symbols-outlined select-none leading-none", className)}
      style={{
        fontSize: size,
        fontVariationSettings: `'FILL' ${fill}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`,
      }}
    >
      {name}
    </span>
  );
}

// 2. FadeUp Helper Component
export function FadeUp({ children, delay = 0, className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3. SpotlightBorder Component (Dynamic CSS Mask cursor tracking)
export function SpotlightBorder({
  children,
  className,
  size = 520,
  intensity = 0.45,
}) {
  const containerRef = useRef(null);

  const handlePointerMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    containerRef.current.style.setProperty("--spot-x", `${x}px`);
    containerRef.current.style.setProperty("--spot-y", `${y}px`);
  };

  const handlePointerLeave = () => {
    if (!containerRef.current) return;
    containerRef.current.style.setProperty("--spot-x", "-9999px");
    containerRef.current.style.setProperty("--spot-y", "-9999px");
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        "--spot-x": "-9999px",
        "--spot-y": "-9999px",
        "--size": `${size}px`,
        "--intensity": intensity,
      }}
      className={cn("group relative", className)}
    >
      {/* Outer ring */}
      <div className="pointer-events-none absolute inset-0 z-10 rounded-2xl border border-white/10" />

      {/* Inner highlight ring via CSS mask */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl p-[1px] transition-opacity duration-300"
        style={{
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          background:
            "radial-gradient(circle var(--size) at var(--spot-x) var(--spot-y), rgba(255,255,255,var(--intensity)), transparent 60%)",
        }}
      />

      <div className="relative z-30 h-full">{children}</div>
    </div>
  );
}

// 4. AnimatedText Helper
export function AnimatedText({ text, className }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden font-inter", className)}>
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0">
        {text}
      </span>
    </span>
  );
}

// 5. PrimaryButton & SecondaryButton
export function PrimaryButton({
  children,
  href = "#contact",
  onClick,
  size = "sm",
  className,
}) {
  const isSm = size === "sm";
  const content = typeof children === "string" ? <AnimatedText text={children} /> : children;

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-inter leading-none transition-all duration-200 cursor-pointer",
        "bg-white/90 hover:bg-white text-black font-semibold active:scale-[0.98] shadow-md",
        isSm ? "h-9 px-4 text-xs tracking-wide" : "h-11 px-6 text-sm",
        className
      )}
    >
      {content}
    </a>
  );
}

export function SecondaryButton({
  children,
  href = "#contact",
  onClick,
  size = "sm",
  className,
}) {
  const isSm = size === "sm";
  const content = typeof children === "string" ? <AnimatedText text={children} /> : children;

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center justify-center rounded-full font-inter leading-none transition-all duration-200 cursor-pointer",
        "bg-landing-surface hover:bg-landing-surface-hover border border-landing-border text-foreground backdrop-blur-[2.5px] font-medium active:scale-[0.98]",
        isSm ? "h-9 px-4 text-xs tracking-wide" : "h-11 px-6 text-sm",
        className
      )}
    >
      {content}
    </a>
  );
}

// 6. Packages Data (Exact specifications from Master Prompt)
const packages = [
  {
    id: "basic",
    name: "BASIC",
    regularPrice: "$279",
    launchPrice: "$249",
    pricePrefix: null,
    pages: "Up to 6 Pages",
    description: "Everything you need to launch a fast, secure and professional online presence.",
    buttonText: "Get Started",
    featured: false,
    bg: "#121212",
    features: [
      { text: "Up to 6 custom pages" },
      { text: "Custom responsive website design" },
      { text: "React / Next.js / Vite development" },
      { text: "Mobile, tablet and desktop optimization" },
      { text: "Custom navigation and footer" },
      { text: "Contact / enquiry form" },
      { text: "WhatsApp and social links" },
      { text: "Google Maps integration if required" },
      { text: "Basic on-page SEO" },
      { text: "SEO titles and meta descriptions" },
      { text: "Sitemap setup" },
      { text: "Robots configuration" },
      { text: "Google Analytics 4 setup" },
      { text: "Google Search Console setup" },
      { text: "Image optimization" },
      { text: "Core performance optimization" },
      { text: "SSL / HTTPS deployment setup" },
      { text: "Basic security configuration" },
      { text: "Secure form handling" },
      { text: "Basic spam protection" },
      { text: "Basic animations and micro-interactions" },
      { text: "2 revision rounds" },
    ],
  },
  {
    id: "professional",
    name: "PROFESSIONAL",
    badge: "MOST POPULAR",
    regularPrice: "$459",
    launchPrice: "$399",
    pricePrefix: null,
    pages: "Up to 11 Pages",
    description: "For growing businesses that need stronger visibility, lead generation and marketing tools.",
    buttonText: "Choose Professional",
    featured: true,
    bg: "#18181b",
    features: [
      { text: "Up to 11 custom pages" },
      { text: "Enhanced custom UI/UX" },
      { text: "Advanced responsive layouts" },
      { text: "Portfolio / projects section" },
      { text: "Testimonials" },
      { text: "FAQ sections" },
      { text: "Multiple enquiry / lead forms" },
      { text: "Enhanced animations" },
      { text: "Enhanced SEO structure" },
      { text: "Basic structured data / schema setup" },
      { text: "Improved Core Web Vitals optimization" },
      { text: "Enhanced security configuration" },
      { text: "3 revision rounds" },
      {
        isSubheading: true,
        heading: "Marketing Essentials",
      },
      { text: "Google Analytics 4 setup" },
      { text: "Search Console setup" },
      { text: "Basic conversion tracking setup" },
      { text: "Meta Pixel setup" },
      { text: "WhatsApp / CTA tracking" },
      { text: "Newsletter signup integration" },
      { text: "Lead capture forms" },
      { text: "Basic campaign landing-page support" },
    ],
  },
  {
    id: "premium",
    name: "PREMIUM",
    regularPrice: "$669",
    launchPrice: "$579",
    pricePrefix: null,
    pages: "Up to 16 Pages",
    description: "For established brands that need advanced content, marketing integrations and scalable functionality.",
    buttonText: "Go Premium",
    featured: false,
    bg: "#141416",
    features: [
      { text: "Up to 16 custom pages" },
      { text: "Premium custom UI/UX" },
      { text: "Advanced animations and interactions" },
      { text: "CMS integration where required" },
      { text: "Blog / News functionality" },
      { text: "Case studies" },
      { text: "Portfolio management" },
      { text: "Careers / application forms" },
      { text: "Advanced form workflows" },
      { text: "Advanced technical SEO setup" },
      { text: "Enhanced structured data" },
      { text: "Advanced performance tuning" },
      { text: "Enhanced security hardening" },
      { text: "4 revision rounds" },
      {
        isSubheading: true,
        heading: "Advanced Marketing & Growth",
      },
      { text: "Advanced analytics & event tracking" },
      { text: "Google Ads conversion tracking setup" },
      { text: "Advanced Meta Pixel events" },
      { text: "Email marketing platform integration" },
      { text: "CRM integration where supported" },
      { text: "Lead funnel integration" },
      { text: "Remarketing-ready configuration" },
      { text: "Marketing automation integration where supported" },
      { text: "Third-party service integrations" },
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    regularPrice: "$979",
    launchPrice: "$849",
    pricePrefix: "From",
    pages: "Up to 21 Pages",
    description: "For ambitious businesses requiring advanced integrations, performance and a larger digital presence.",
    buttonText: "Build With PENETIX",
    featured: false,
    bg: "#161618",
    features: [
      { text: "Up to 21 custom pages" },
      { text: "High-end custom UI/UX" },
      { text: "Advanced CMS architecture" },
      { text: "Complex interactive components" },
      { text: "Advanced content architecture" },
      { text: "Selected API integrations" },
      { text: "Advanced data-driven sections" },
      { text: "Advanced analytics and event tracking" },
      { text: "Enhanced performance engineering" },
      { text: "Enhanced technical SEO" },
      { text: "Advanced security configuration" },
      { text: "Dependency and deployment security checks" },
      { text: "Advanced form / workflow integrations" },
      { text: "Priority development support" },
      { text: "Scalable deployment architecture" },
      { text: "Enhanced QA and cross-device testing" },
      { text: "5 revision rounds" },
    ],
  },
];

const enterpriseSolutions = [
  "SaaS Platforms",
  "Customer & Staff Portals",
  "Custom Dashboards",
  "Advanced E-commerce",
  "Booking Platforms",
  "CRM / ERP Integrations",
  "Custom APIs & Automation",
  "Cloud Platforms",
];

const techStackList = [
  { name: "React.js", category: "Component Architecture", icon: Code2 },
  { name: "Next.js", category: "Full-Stack & SSR", icon: Sparkles },
  { name: "Vite", category: "High-Speed Bundler", icon: Zap },
  { name: "TypeScript", category: "Type-Safe Robustness", icon: Layers },
  { name: "Tailwind CSS", category: "Modern Design System", icon: Sparkles },
  { name: "Node.js & APIs", category: "Backend Integrations", icon: Server },
  { name: "Vercel / Cloud Edge", category: "Global Edge Infrastructure", icon: Globe },
  { name: "Web Standards", category: "Mobile & Accessibility", icon: ShieldCheck },
];

// 7. PricingCard Component (Order strictly matching Section 14)
export function PricingCard({ plan, onContact }) {
  const [expanded, setExpanded] = useState(false);
  const visibleFeatures = expanded ? plan.features : plan.features.slice(0, 10);
  const hiddenFeatureCount = Math.max(plan.features.length - 10, 0);

  const handleAction = (e) => {
    if (onContact) {
      e.preventDefault();
      onContact(`Web Development Package: ${plan.name} (${plan.launchPrice})`);
    }
  };

  return (
    <SpotlightBorder
      size={460}
      intensity={plan.featured ? 0.6 : 0.4}
      className="relative h-full p-2 sm:p-2.5"
    >
      <div
        className={cn(
          "relative flex h-full flex-col rounded-2xl border p-6 sm:p-7 transition-all duration-300",
          plan.featured
            ? "border-emerald-500/40 bg-gradient-to-b from-white/[0.08] to-white/[0.03] shadow-[0_16px_50px_rgba(10,81,66,0.2)] ring-1 ring-emerald-500/20"
            : "border-white/10 hover:border-white/20"
        )}
        style={{ backgroundColor: plan.bg }}
      >
        {/* Most Popular Badge on Professional */}
        {plan.badge && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-emerald-400/30 bg-[#0a5142] px-3.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-100 shadow-lg">
            {plan.badge}
          </div>
        )}

        {/* 1. PACKAGE NAME */}
        <FadeUp delay={0}>
          <div className="text-xs uppercase tracking-[0.22em] font-semibold text-foreground/80">
            {plan.name}
          </div>
        </FadeUp>

        {/* 2. Small description */}
        <FadeUp delay={0.05}>
          <p className="mt-2 text-xs leading-relaxed text-foreground/60 min-h-[38px]">
            {plan.description}
          </p>
        </FadeUp>

        {/* 3. Strikethrough regular price + 4. Large launch price */}
        <FadeUp delay={0.1}>
          <div className="mt-4 flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground/40 font-medium">Regular</span>
              <span className="text-sm text-foreground/45 line-through font-mono">
                {plan.regularPrice}
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-1.5">
              {plan.pricePrefix && (
                <span className="text-sm text-foreground/60 font-medium">{plan.pricePrefix}</span>
              )}
              <span className="text-4xl sm:text-[2.75rem] font-semibold tracking-tight text-white leading-none">
                {plan.launchPrice}
              </span>
              <span className="text-xs text-emerald-400/90 font-medium ml-1">Launch Price</span>
            </div>
          </div>
        </FadeUp>

        {/* 5. Page allowance & Extra Pages Note */}
        <FadeUp delay={0.15}>
          <div className="mt-4 flex flex-col items-start gap-1.5">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-foreground/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{plan.pages}</span>
            </div>
            <p className="text-[11px] text-foreground/50 tracking-normal pl-0.5">
              Extra standard pages +$29 each
            </p>
          </div>
        </FadeUp>

        {/* 6. CTA button */}
        <FadeUp delay={0.2}>
          <div className="mt-6">
            {plan.featured ? (
              <PrimaryButton
                href="#contact"
                onClick={handleAction}
                size="sm"
                className="w-full bg-white text-black hover:bg-white/95"
              >
                {plan.buttonText}
              </PrimaryButton>
            ) : (
              <SecondaryButton
                href="#contact"
                onClick={handleAction}
                size="sm"
                className="w-full"
              >
                {plan.buttonText}
              </SecondaryButton>
            )}
          </div>
        </FadeUp>

        {/* 7. Divider */}
        <div className="mt-6 border-t border-white/10" />

        {/* 8. Feature list */}
        <FadeUp delay={0.25} className="flex flex-1 flex-col">
          <ul className="mt-5 flex flex-1 flex-col gap-2.5">
            {visibleFeatures.map((item, idx) => {
              if (item.isSubheading) {
                return (
                  <li
                    key={idx}
                    className="pt-3 pb-1 border-t border-white/10 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400"
                  >
                    {item.heading}
                  </li>
                );
              }
              return (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs leading-relaxed text-foreground/75"
                >
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0 text-emerald-400"
                    strokeWidth={2.5}
                  />
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
          {hiddenFeatureCount > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              className="mt-4 w-full rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2 text-[11px] font-medium text-foreground/65 transition-colors hover:border-white/20 hover:text-white"
              aria-expanded={expanded}
            >
              {expanded ? "Show fewer features" : `View all features (+${hiddenFeatureCount})`}
            </button>
          )}
        </FadeUp>
      </div>
    </SpotlightBorder>
  );
}

// 8. Main PricingSection Component
export default function PricingSection({ onContact }) {
  const handleCustomQuote = (e) => {
    if (onContact) {
      e.preventDefault();
      onContact("Enterprise / Custom Web Project");
    }
  };

  const handleBudgetInquiry = (e) => {
    if (onContact) {
      e.preventDefault();
      onContact("Flexible Budget Consultation (Web Development)");
    }
  };

  return (
    <section
      id="pricing"
      className="relative w-full scroll-mt-36 bg-[#000000] py-14 sm:py-20 font-inter text-foreground"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* SECTION HEADER */}
        <div className="mb-14 max-w-3xl">
          <FadeUp>
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-landing-surface border border-white/10 px-3.5 py-1 text-xs text-foreground/80 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              PENETIX Web Development Pricing
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-[-0.03em] leading-[1.06] text-white">
              Transparent packages.
              <br />
              <span className="text-foreground/85">Built for security and scale.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-4 text-sm sm:text-base text-foreground/60 leading-relaxed max-w-2xl">
              Engineered with modern web architectures and security-focused practices. Introductory launch pricing is shown in USD with scope defined before work begins.
            </p>
          </FadeUp>
        </div>

        {/* 4 MAIN PRICING CARDS (1 col on mobile, 2 cols on tablet, 4 cols on desktop) */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {packages.map((pkg) => (
            <PricingCard key={pkg.id} plan={pkg} onContact={onContact} />
          ))}
        </div>

        {/* SHARED ADDITIONAL-PAGE DISCLAIMER */}
        <FadeUp delay={0.15}>
          <div className="mt-6 text-center">
            <p className="text-xs text-foreground/60 leading-relaxed max-w-2xl mx-auto">
              Additional-page pricing applies to standard informational pages only. Advanced functionality is quoted separately.
            </p>
          </div>
        </FadeUp>

        {/* HOSTING / DOMAIN RULE NOTE */}
        <div className="mt-2 text-center">
          <p className="text-[11px] text-foreground/40 leading-relaxed max-w-3xl mx-auto">
            * Domain registration, premium hosting, paid APIs, third-party subscriptions, premium licences and external platform fees are not included unless specifically stated in the project quotation.
          </p>
        </div>

        {/* COMPACT ENTERPRISE / CUSTOM SECTION */}
        <div className="mt-12 sm:mt-14">
          <SpotlightBorder size={500} intensity={0.4} className="p-0.5">
            <div className="rounded-2xl border border-white/12 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 sm:p-7 md:p-8 backdrop-blur-xl">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* LEFT: label, heading, subhead, description */}
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] font-medium text-emerald-300">
                    Custom Architecture
                  </span>
                  <h3 className="mt-2.5 text-xl sm:text-2xl font-normal tracking-tight text-white">
                    ENTERPRISE / CUSTOM
                  </h3>
                  <p className="mt-0.5 text-sm text-emerald-400 font-medium">
                    Built Around Your Requirements.
                  </p>
                  <p className="mt-2 text-xs sm:text-sm text-foreground/60 leading-relaxed max-w-xl">
                    For organizations that require bespoke web applications, complex multi-system integrations, high-load architecture, or customized cloud platforms.
                  </p>
                </div>

                {/* RIGHT: Custom Quote + CTA */}
                <div className="flex flex-row items-center justify-between sm:justify-start lg:flex-col lg:items-end gap-3 shrink-0 pt-2 lg:pt-0 border-t border-white/10 lg:border-t-0">
                  <div className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                    Custom Quote
                  </div>
                  <PrimaryButton
                    href="#contact"
                    onClick={handleCustomQuote}
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 px-5"
                  >
                    Talk to PENETIX
                  </PrimaryButton>
                </div>
              </div>

              {/* Compact 2-row Solution Tags */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider text-foreground/45 font-medium mr-1">
                    Solutions:
                  </span>
                  {enterpriseSolutions.map((solution, i) => (
                    <span
                      key={i}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-foreground/75 transition-colors hover:border-white/20 hover:text-white"
                    >
                      {solution}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </SpotlightBorder>
        </div>

        {/* BUILT WITH MODERN TECHNOLOGIES */}
        <div className="mt-16 sm:mt-20 border-t border-white/10 pt-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/50">
              Stack Architecture
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-normal tracking-tight text-white">
              Built With Modern Technologies
            </h3>
            <p className="mt-3 text-xs sm:text-sm text-foreground/60 leading-relaxed">
              Each project uses a technology stack selected for performance, security, scalability and long-term maintainability.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            {techStackList.map((t, idx) => {
              const Icon = t.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-emerald-400">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-white">{t.name}</div>
                    <div className="text-[10px] text-foreground/45">{t.category}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPACT BUDGET-FRIENDLY SECTION */}
        <div className="mt-12 sm:mt-14">
          <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-white/[0.02] to-transparent p-5 sm:p-6 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  <Sparkles size={14} />
                  Flexible Scope & Budgeting
                </span>
                <h4 className="mt-1.5 text-lg sm:text-xl font-normal text-white">
                  Need a More Flexible Option?
                </h4>
                <p className="mt-2 text-xs text-foreground/65 leading-relaxed">
                  Working with a specific budget? Talk to us. We can review your priorities, adjust the scope and create a practical solution that fits your current budget while leaving room to scale later.
                </p>
                <p className="mt-1.5 text-xs font-medium text-emerald-300/90">
                  Flexible payment plans of up to 4 months are available for eligible projects.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={handleBudgetInquiry}
                  className="rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-400/30 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-emerald-200 transition-all active:scale-95"
                >
                  Discuss Your Budget
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
