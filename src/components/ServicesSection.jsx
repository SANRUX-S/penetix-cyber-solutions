import { memo } from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/content.js';
import { SectionHeading, SectionFoot } from './SectionParts.jsx';

function ServicesSection({ onContact }) {
  return (
    <section className="section-panel services-section" id="services" aria-labelledby="services-title" data-section="02">
      <div className="container">
        <SectionHeading label="WHAT WE DO" title={<>Practical cybersecurity<br />for real businesses.</>} number="02" id="services-title">
          <p>Focused services designed to identify risk, improve security, and give businesses a clear path forward.</p>
          <a href="#service-grid" className="text-link">View All Services <ArrowRight size={17} /></a>
        </SectionHeading>
        <div className="services-grid" id="service-grid">
          {services.map(({ title, description, image }, index) => (
            <button
              className="service-card service-card-graphic"
              key={title}
              onClick={() => onContact(title)}
              data-reveal
              style={{ '--reveal-delay': `${(index % 4) * 55}ms` }}
              aria-label={`Service ${String(index + 1).padStart(2, '0')}: ${title} - ${description}`}
            >
              <img
                src={image}
                alt={`${title}: ${description}`}
                className="service-card-img"
                loading="lazy"
                width={414}
                height={index >= 8 ? 297 : 316}
              />
              <span className="sr-only">
                <h3>{title}</h3>
                <p>{description}</p>
              </span>
            </button>
          ))}
        </div>
        <SectionFoot left="CLEAR SCOPE. RELEVANT FINDINGS. PRACTICAL NEXT STEPS." right="SECURITY, WITH YOUR BUSINESS IN MIND." />
      </div>
    </section>
  );
}

export default memo(ServicesSection);
