import { ShieldCheck, Layers3, Globe2, Server, Mail, KeyRound, Activity, DatabaseBackup, Cloud, Laptop, GraduationCap, Route, MessageSquare, Hexagon, LockKeyhole, ChartNoAxesColumnIncreasing } from 'lucide-react';

export const services = [
  { title: 'Security Assessment', icon: ShieldCheck, description: 'Review your current security posture and identify critical risks and gaps.', image: '/images/services/service-01.webp' },
  { title: 'Vulnerability Assessment', icon: Layers3, description: 'Identify and prioritize security weaknesses across your systems and applications.', image: '/images/services/service-02.webp' },
  { title: 'Website Security Review', icon: Globe2, description: 'Assess website configuration, authentication, headers and exposed services for security risks.', image: '/images/services/service-03.webp' },
  { title: 'Infrastructure Hardening', icon: Server, description: 'Strengthen server and hosting configurations, permissions, access controls and essential protections.', image: '/images/services/service-04.webp' },
  { title: 'Email Security', icon: Mail, description: 'Improve email configuration, phishing resistance and account protection.', image: '/images/services/service-05.webp' },
  { title: 'Account & Access Security', icon: KeyRound, description: 'Review MFA, passwords, permissions and privileged accounts.', image: '/images/services/service-06.webp' },
  { title: 'Security Health Check', icon: Activity, description: 'Practical review of accounts, devices, backups, hosting, email and common security risks.', image: '/images/services/service-07.webp' },
  { title: 'Backup & Recovery Review', icon: DatabaseBackup, description: 'Review backup practices, restore readiness and basic recovery planning.', image: '/images/services/service-08.webp' },
  { title: 'Cloud / Hosting Security Review', icon: Cloud, description: 'Review cloud or hosting configurations for common misconfigurations and risks.', image: '/images/services/service-09.webp' },
  { title: 'Device Security Review', icon: Laptop, description: 'Review basic security hygiene for business laptops and workstations including updates, antivirus and configuration.', image: '/images/services/service-10.webp' },
  { title: 'Security Awareness', icon: GraduationCap, description: 'Help teams understand phishing, suspicious links, password safety and common threats.', image: '/images/services/service-11.webp' },
  { title: 'Security Improvement Roadmap', icon: Route, description: 'Turn findings into a clear, prioritized plan with practical next steps.', image: '/images/services/service-12.webp' },
];

export const approach = [
  { title: 'Scope', text: 'Understand the business, systems, authorization and assessment boundaries.', note: 'A clear starting point' },
  { title: 'Assess', text: 'Review relevant systems, configurations and security controls within the agreed scope.', note: 'An informed perspective' },
  { title: 'Prioritize', text: 'Separate important risks from unnecessary noise and explain what matters most.', note: 'Focus where it counts' },
  { title: 'Improve', text: 'Provide practical recommendations and a clear improvement path.', note: 'A stronger way forward' },
];

export const pillars = [
  { title: 'Clear Communication', icon: MessageSquare, text: 'Explain findings in language the business can actually understand.' },
  { title: 'Practical Recommendations', icon: Hexagon, text: 'Prioritize realistic actions instead of overwhelming clients with unnecessary complexity.' },
  { title: 'Confidential Handling', icon: LockKeyhole, text: 'Treat security information, project details and findings with appropriate care.' },
  { title: 'Business-Focused Security', icon: ChartNoAxesColumnIncreasing, text: 'Connect technical risks to practical business impact and priorities.' },
];

export const resources = [
  { title: 'Cybersecurity Basics', category: 'FOUNDATIONS', summary: 'Understand the essentials of protecting your business, your people and your information.', image: 'mountains', position: '50% 44%' },
  { title: 'Website Security Checklist', category: 'WEBSITE SECURITY', summary: 'A practical starting point for reviewing configuration, access and everyday website risks.', image: 'architecture', position: '85% 42%' },
  { title: 'Email Security Guide', category: 'EMAIL & COMMUNICATION', summary: 'Simple steps toward safer communication, stronger accounts and phishing awareness.', image: 'hero-architecture', position: '87% 38%' },
  { title: 'Business Security Checklist', category: 'BUSINESS SECURITY', summary: 'A clearer view of the security habits and controls that support your day-to-day business.', image: 'architecture', position: '17% 50%' },
  { title: 'Account Security Guide', category: 'IDENTITY & ACCESS', summary: 'Make sense of multifactor authentication, permissions and better password practices.', image: 'hero-architecture', position: '50% 58%' },
  { title: 'Backup & Recovery Guide', category: 'BUSINESS RESILIENCE', summary: 'Understand backup coverage, restore readiness and the foundations of recovery planning.', image: 'mountains', position: '15% 62%' },
];
