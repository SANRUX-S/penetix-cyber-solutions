import React from 'react';

export default function BenefitsSection() {
  return (
    <div className="benefits-section-root w-full bg-black">
      <div className="benefits-wrapper w-full max-w-[1400px] mx-auto">
        <section
          className="benefits-container relative w-full bg-black px-4 sm:px-6 md:px-10 py-12 sm:py-20"
          aria-labelledby="benefits-title"
        >
          {/* Section Heading */}
          <h2
            id="benefits-title"
            className="benefits-heading text-white text-3xl sm:text-4xl md:text-5xl font-light text-center mb-12 sm:mb-24"
            style={{ letterSpacing: '-0.04em' }}
          >
            Key Benefits
          </h2>

          {/* Three-Column Card Grid */}
          <div className="benefits-grid grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {/* Card 1: Text Card (Left) */}
            <div className="benefit-card benefit-card-padded relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden p-6 sm:p-8">
              {/* Blue Blob */}
              <div
                className="blob-card-1 absolute top-1/2 -translate-y-1/2 -left-[420px] h-[460px] w-[460px] rounded-full bg-[#1e3a8a] blur-3xl opacity-40"
                aria-hidden="true"
              />

              {/* Content wrapper */}
              <div className="benefit-content relative z-10 flex flex-col h-full">
                <h3 className="benefit-card-title text-white text-xl sm:text-2xl font-light leading-tight">
                  Preemptive Risks
                  <br />
                  Scouting and Reactions
                </h3>
                <p className="benefit-body-c1 mt-12 sm:mt-20 text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-light max-w-[280px]">
                  Defense platforms constantly observe bandwidth streams, record files, and machine
                  behaviors to uncover unusual patterns or outliers that could signal a defensive
                  failure.
                </p>
              </div>
            </div>

            {/* Card 2: Video Card (Center) */}
            <div className="benefit-card benefit-card-video relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden flex flex-col">
              {/* Top video region */}
              <div
                className="benefit-video-wrapper relative w-full overflow-hidden"
                style={{ height: '75%' }}
              >
                <video
                  className="benefit-video w-full h-full object-cover block"
                  autoPlay
                  loop
                  muted
                  playsInline
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4"
                />
                {/* Bottom fade overlay */}
                <div
                  className="benefit-video-fade pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-neutral-950"
                  aria-hidden="true"
                />
              </div>

              {/* Bottom text region */}
              <div className="benefit-video-caption flex-1 flex items-center justify-start p-6 sm:p-8">
                <h3 className="benefit-card-title text-white text-xl sm:text-2xl font-light leading-tight text-left">
                  Know-how and Sectoral
                  <br />
                  Awareness
                </h3>
              </div>
            </div>

            {/* Card 3: Text Card (Right) */}
            <div className="benefit-card benefit-card-padded relative h-[380px] sm:h-[460px] rounded-2xl bg-neutral-950 overflow-hidden p-6 sm:p-8">
              {/* Blue Blob */}
              <div
                className="blob-card-3 absolute -top-28 -right-28 h-56 w-56 rounded-full bg-[#1e3a8a] blur-3xl opacity-40"
                aria-hidden="true"
              />

              {/* Content wrapper */}
              <div className="benefit-content relative z-10 flex flex-col h-full">
                <h3 className="benefit-card-title text-white text-xl sm:text-2xl font-light leading-tight">
                  Preemptive Risks
                  <br />
                  Scouting and Reactions
                </h3>
                <p className="benefit-body-c3 mt-auto text-[13px] sm:text-[14px] leading-relaxed text-white/70 font-light max-w-[320px]">
                  Defense platforms constantly observe bandwidth streams, record files, and machine
                  behaviors to uncover unusual patterns or outliers that could signal a defensive
                  failure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
