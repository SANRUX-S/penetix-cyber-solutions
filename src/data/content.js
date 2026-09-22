import { ShieldCheck, Layers3, Globe2, Server, Mail, KeyRound, Activity, DatabaseBackup, Cloud, Laptop, GraduationCap, Route, MessageSquare, Hexagon, LockKeyhole, ChartNoAxesColumnIncreasing } from 'lucide-react';

export const services = [
  { title: 'Security Assessment', icon: ShieldCheck, description: 'Review the current security posture and identify important weaknesses.' },
  { title: 'Vulnerability Assessment', icon: Layers3, description: 'Identify and prioritize security weaknesses across authorized websites and systems.' },
  { title: 'Website Security Review', icon: Globe2, description: 'Review website configuration, authentication, headers, exposed services and common security risks.' },
  { title: 'Infrastructure Hardening', icon: Server, description: 'Improve hosting, server configurations, permissions, access controls and essential protections.' },
  { title: 'Email Security', icon: Mail, description: 'Improve email configuration, phishing resistance and account protection.' },
  { title: 'Account & Access Security', icon: KeyRound, description: 'Review MFA, passwords, permissions, privileged accounts and access practices.' },
  { title: 'Security Health Check', icon: Activity, description: 'Practical review of accounts, devices, backups, hosting, email and common business security risks.' },
  { title: 'Backup & Recovery Review', icon: DatabaseBackup, description: 'Review backup practices, restore readiness and basic recovery planning.' },
  { title: 'Cloud / Hosting Security Review', icon: Cloud, description: 'Review supported cloud or hosting configurations for common security weaknesses.' },
  { title: 'Device Security Review', icon: Laptop, description: 'Review basic security hygiene for business laptops and workstations including updates, encryption and access.' },
  { title: 'Security Awareness', icon: GraduationCap, description: 'Help teams understand phishing, suspicious links, password safety and common digital threats.' },
  { title: 'Security Improvement Roadmap', icon: Route, description: 'Turn findings into a clear prioritized plan: what to fix first, next and later.' },
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
