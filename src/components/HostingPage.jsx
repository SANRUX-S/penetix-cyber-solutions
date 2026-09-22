import {
  ShieldCheck,
  Server,
  DatabaseBackup,
  Activity,
  ArrowRight,
  Clock3,
  Network,
} from 'lucide-react';
import Footer from './Footer.jsx';

const plannedCapabilities = [
  {
    icon: ShieldCheck,
    title: 'Security-focused baseline',
    description:
      'Hardened deployment standards, least-privilege administration, secure access controls and documented configuration practices.',
  },
  {
    icon: Server,
    title: 'Isolated workloads',
    description:
      'Client workloads are planned around clear isolation boundaries with controlled resource allocation and maintainable deployment patterns.',
  },
  {
    icon: DatabaseBackup,
    title: 'Backup & recovery planning',
    description:
      'Automated backup workflows, separate recovery copies and restore testing are being designed before managed hosting is offered publicly.',
  },
  {
    icon: Activity,
    title: 'Monitoring & alerting',
    description:
      'Availability, resource health and security-relevant events will be monitored with clear alerting and operational response procedures.',
  },
  {
    icon: Network,
    title: 'Scalable network architecture',
    description:
      'The platform is being planned to support reliable networking, future redundancy and controlled expansion as customer demand grows.',
  },
  {
    icon: Clock3,
    title: 'Transparent service levels',
    description:
      'Uptime targets, support windows, backup retention and other service commitments will be published only after they are tested and supportable.',
  },
];

export default function HostingPage({ onContact, onLegal, onNavigateHome }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-6xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Managed Hosting — In Development
          </div>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-normal tracking-[-0.035em] sm:text-5xl md:text-6xl">
                PENETIX managed hosting is being built with security and operational reliability in mind.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                We are currently preparing the infrastructure, backup processes, monitoring, access controls and service procedures required before offering paid managed hosting.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-400">
                Current status
              </div>
              <div className="mt-2 text-2xl font-medium">Infrastructure rollout</div>
              <p className="mt-2 text-sm leading-relaxed text-white/55">
                Hosting specifications, pricing and SLAs will be published after validation. No unsupported uptime, latency or capacity guarantees are being advertised.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onContact?.('Managed Hosting / Future Infrastructure')}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Discuss Future Hosting
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={() => onNavigateHome?.()}
              className="rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.08]"
            >
              Back to Home
            </button>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Planned foundation
            </span>
            <h2 className="mt-3 text-3xl font-normal tracking-tight sm:text-4xl">
              What we are preparing before launch.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
              These are implementation goals, not contractual guarantees. Final service levels and package specifications will be published when the platform is ready for production customers.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plannedCapabilities.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-emerald-400">
                  <Icon size={19} />
                </div>
                <h3 className="mt-5 text-lg font-medium">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{description}</p>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-xl font-medium">Need hosting guidance now?</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/55">
                  PENETIX can still help review an existing hosting setup, deployment architecture or website security posture while our managed hosting platform is being prepared.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onContact?.('Cloud / Hosting Security Review')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-500/10 px-5 py-2.5 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15"
              >
                Request a Review
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer onContact={onContact} onLegal={onLegal} />
    </div>
  );
}
